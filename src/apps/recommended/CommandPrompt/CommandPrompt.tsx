import { ADMIN } from '@constants/storeConstants';
import { useAuth, useBootStatus, useWorkspaceState } from '@store/store';
import { FormEvent, useRef, useState, useEffect, KeyboardEvent } from 'react';
import {
  CommandValue,
  HELP_TEXT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from './constants';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { useWindowManager } from '@hooks/useWindowManager';
import {
  findAppByName,
  findMostRecentWindow,
  parseCommandInput,
  getMaxZIndex,
} from './helperFunctions';
import './CommandPrompt.scss';

interface CommandHistory {
  input: string;
  output: string | string[];
  timestamp: Date;
}

function CommandPrompt() {
  const { isAdmin, updateAuthState } = useAuth();
  const { updateBootStatus } = useBootStatus();
  const {
    activeWindows,
    windowInstanceCounters,
    setWindowIsMaximized,
    updateWindowZIndex,
    requestCloseWindow,
  } = useWorkspaceState();
  const { launchWindow } = useWindowManager();

  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // -1 means not navigating history
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const homePath = `C:\\USERS\\${isAdmin ? ADMIN : 'GUEST'}`;

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (input: string): string | string[] => {
    const trimmed = input.trim();
    if (!trimmed) return ERROR_MESSAGES.NO_COMMAND;

    const { command: cmd, args } = parseCommandInput(input);

    switch (cmd as CommandValue) {
      case 'help': {
        if (args.length === 0) return HELP_TEXT.GENERAL;
        const helpCmd = args[0].toLowerCase();
        return (
          HELP_TEXT.COMMANDS[helpCmd as keyof typeof HELP_TEXT.COMMANDS] ||
          ERROR_MESSAGES.UNKNOWN_HELP_TOPIC(helpCmd)
        );
      }

      case 'apps': {
        const appList = APP_REGISTRY.map(
          (app) => `  - ${app.appName} (id: ${app.id})`
        );
        return ['Available apps:', '', ...appList];
      }

      case 'open': {
        if (args.length === 0) return ERROR_MESSAGES.NO_APP_SPECIFIED('open');
        const appName = args.join(' ');
        const app = findAppByName(appName);
        if (!app) return ERROR_MESSAGES.APP_NOT_FOUND(appName);
        launchWindow(app.id);
        return SUCCESS_MESSAGES.OPENING(app.appName);
      }

      case 'close': {
        if (args.length === 0) return ERROR_MESSAGES.NO_APP_SPECIFIED('close');
        const appName = args.join(' ');
        const app = findAppByName(appName);
        if (!app) return ERROR_MESSAGES.APP_NOT_FOUND(appName);
        const window = findMostRecentWindow(
          app.id,
          activeWindows,
          windowInstanceCounters
        );
        if (!window || !window.id)
          return ERROR_MESSAGES.NO_WINDOW_FOUND(app.appName);
        requestCloseWindow(window.id);
        return SUCCESS_MESSAGES.CLOSING(app.appName);
      }

      case 'hide': {
        if (args.length === 0) return ERROR_MESSAGES.NO_APP_SPECIFIED('hide');
        const appName = args.join(' ');
        const app = findAppByName(appName);
        if (!app) return ERROR_MESSAGES.APP_NOT_FOUND(appName);
        const window = findMostRecentWindow(
          app.id,
          activeWindows,
          windowInstanceCounters
        );
        if (!window || !window.id)
          return ERROR_MESSAGES.NO_WINDOW_FOUND(app.appName);
        setWindowIsMaximized(window.id, 'minimized');
        return SUCCESS_MESSAGES.MINIMIZING(app.appName);
      }

      case 'show': {
        if (args.length === 0) return ERROR_MESSAGES.NO_APP_SPECIFIED('show');
        const appName = args.join(' ');
        const app = findAppByName(appName);
        if (!app) return ERROR_MESSAGES.APP_NOT_FOUND(appName);
        const window = findMostRecentWindow(
          app.id,
          activeWindows,
          windowInstanceCounters
        );
        if (!window || !window.id)
          return ERROR_MESSAGES.NO_WINDOW_FOUND(app.appName);
        setWindowIsMaximized(window.id, 'maximized');
        return SUCCESS_MESSAGES.MAXIMIZING(app.appName);
      }

      case 'activate': {
        if (args.length === 0)
          return ERROR_MESSAGES.NO_APP_SPECIFIED('activate');
        const appName = args.join(' ');
        const app = findAppByName(appName);
        if (!app) return ERROR_MESSAGES.APP_NOT_FOUND(appName);
        const window = findMostRecentWindow(
          app.id,
          activeWindows,
          windowInstanceCounters
        );
        if (!window || !window.id)
          return ERROR_MESSAGES.NO_WINDOW_FOUND(app.appName);

        const maxZIndex = getMaxZIndex(activeWindows);
        updateWindowZIndex(window.id, maxZIndex + 1);

        // Also restore if minimized
        if (window.isMaximized === 'minimized') {
          setWindowIsMaximized(window.id, window.previousDisplayState);
        }
        return SUCCESS_MESSAGES.ACTIVATING(app.appName);
      }

      case 'shutdown': {
        updateBootStatus('DISPLAY_SHUTDOWN_SCREEN');
        return SUCCESS_MESSAGES.SHUTDOWN;
      }

      case 'logout': {
        updateAuthState(null);
        updateBootStatus('DISPLAY_LOGIN_SCREEN');
        return SUCCESS_MESSAGES.LOGOUT;
      }

      case 'clear': {
        setHistory([]);
        return SUCCESS_MESSAGES.CLEAR;
      }

      default:
        return ERROR_MESSAGES.UNKNOWN_COMMAND(cmd);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!command.trim()) return;

    // Process command and get output
    const output = processCommand(command);

    // Add to history
    setHistory((prev) => [
      ...prev,
      {
        input: command,
        output,
        timestamp: new Date(),
      },
    ]);

    setCommand('');
    setHistoryIndex(-1); // Reset history navigation
  };

  // Focus input when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault(); // Prevent cursor movement
      if (history.length === 0) return;

      // Move backwards in history
      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setCommand(history[newIndex].input);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent cursor movement
      if (history.length === 0 || historyIndex === -1) return;

      // Move forwards in history
      const newIndex = historyIndex + 1;

      if (newIndex >= history.length) {
        // Reached the end, show empty input
        setHistoryIndex(-1);
        setCommand('');
      } else {
        setHistoryIndex(newIndex);
        setCommand(history[newIndex].input);
      }
    }
  };

  // Render output (string or string array)
  const renderOutput = (output: string | string[]) => {
    if (Array.isArray(output)) {
      return output.map((line, idx) => <div key={idx}>{line}</div>);
    }
    return <div>{output}</div>;
  };

  return (
    <div className="cp" onClick={handleTerminalClick} ref={terminalRef}>
      <p className="cp__welcome">
        Welcome to my OS style portfolio (version 1.0.0). Type <kbd>help</kbd>{' '}
        for a list of commands and <kbd>help &lt;command-name&gt;</kbd> for
        their usage.
      </p>

      {/* Command history */}
      {history.map((entry, idx) => (
        <div key={idx} className="cp__history-entry">
          <div className="cp__history-input">
            <span className="cp__prompt">{homePath}&gt;</span>
            <span className="cp__command">{entry.input}</span>
          </div>
          <div className="cp__history-output">{renderOutput(entry.output)}</div>
        </div>
      ))}

      {/* Current input */}
      <form className="cp__form" onSubmit={handleSubmit}>
        <span className="cp__prompt">{homePath}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="cp__input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default CommandPrompt;
