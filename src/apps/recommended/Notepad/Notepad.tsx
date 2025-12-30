import React, { useCallback, useRef, useState } from 'react';
import { useWindowManager } from '@hooks/useWindowManager';
import './Notepad.scss';
import NotepadMenu, { NotepadMenuItemCategory } from './NotepadMenu';
import { EDIT_MENU_ITEMS, FILE_MENU_ITEMS, VIEW_MENU_ITEMS } from './constants';

function Notepad() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('Untitled.txt');
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [hideStatusBar, setHideStatusBar] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [showMenu, setShowMenu] = useState<NotepadMenuItemCategory | undefined>(
    undefined
  );
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const [hasSelection, setHasSelection] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { launchWindow } = useWindowManager();

  // Track cursor position
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    // Save to undo stack
    setUndoStack((prev) => [...prev, content]);
    setRedoStack([]); // Clear redo stack on new change

    setContent(newContent);
    updateCursorPosition(e.target);
  };

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    updateCursorPosition(e.currentTarget);
  };

  const handleTextareaKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    updateCursorPosition(e.currentTarget);
  };

  const updateCursorPosition = (textarea: HTMLTextAreaElement) => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');

    setLineNumber(lines.length);
    setColumnNumber(lines[lines.length - 1].length + 1);

    // Update hasSelection state
    setHasSelection(textarea.selectionStart !== textarea.selectionEnd);
  };

  // File operations
  // const handleNewTab = () => {
  //   // For now, just clear content - in future this would create actual tabs
  //   if (
  //     content &&
  //     !window.confirm('Are you sure? Unsaved changes will be lost.')
  //   ) {
  //     return;
  //   }
  //   setContent('');
  //   setFilename('Untitled.txt');
  //   setUndoStack([]);
  //   setRedoStack([]);
  // };

  const handleNewWindow = () => {
    launchWindow('notepad');
  };

  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileRead = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
      setFilename(file.name);
      setUndoStack([]);
      setRedoStack([]);
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAs = () => {
    const newFilename = window.prompt('Enter filename:', filename);
    if (!newFilename) return;

    setFilename(
      newFilename.endsWith('.txt') ? newFilename : `${newFilename}.txt`
    );
    handleSave();
  };

  const handlePrint = () => {
    handleSave(); // Print as .txt means download
  };

  const handleCloseTab = () => {
    if (
      content &&
      !window.confirm('Are you sure? Unsaved changes will be lost.')
    ) {
      return;
    }
    setContent('');
    setFilename('Untitled.txt');
  };

  const handleCloseWindow = () => {
    window.close(); // This will close the window/app
  };

  // Edit operations
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;

    const previousContent = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, content]);
    setContent(previousContent);
    setUndoStack((prev) => prev.slice(0, -1));
  }, [undoStack, content]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;

    const nextContent = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, content]);
    setContent(nextContent);
    setRedoStack((prev) => prev.slice(0, -1));
  }, [redoStack, content]);

  const handleCut = async () => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText);
        const newContent = content.substring(0, start) + content.substring(end);
        setUndoStack((prev) => [...prev, content]);
        setRedoStack([]);
        setContent(newContent);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, start);
      } catch (err) {
        console.error('Failed to cut:', err);
      }
    }
  };

  const handleCopy = async () => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handlePaste = async () => {
    if (!textareaRef.current) return;

    try {
      const clipboardText = await navigator.clipboard.readText();
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;

      const newContent =
        content.substring(0, start) + clipboardText + content.substring(end);

      setUndoStack((prev) => [...prev, content]);
      setRedoStack([]);
      setContent(newContent);

      const newCursorPos = start + clipboardText.length;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  const handleFind = () => {
    // Basic find using browser's prompt
    const searchTerm = window.prompt('Find:');
    if (searchTerm && textareaRef.current) {
      const text = textareaRef.current.value;
      const index = text.indexOf(searchTerm);
      if (index !== -1) {
        textareaRef.current.setSelectionRange(index, index + searchTerm.length);
        textareaRef.current.focus();
      } else {
        alert(`Cannot find "${searchTerm}"`);
      }
    }
  };

  // View operations
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleToggleWordWrap = () => {
    setWordWrap((prev) => !prev);
  };

  const handleToggleStatusBar = () => {
    setHideStatusBar((prev) => !prev);
  };

  const handleNotepadMenuClose = (
    id?: number,
    category?: NotepadMenuItemCategory
  ) => {
    if (id === undefined || category === undefined) {
      setShowMenu(undefined);
      return;
    }

    // Handle File menu actions
    if (category === 'file') {
      switch (id) {
        case 1: // New Tab
          // handleNewTab();
          break;
        case 2: // New Window
          handleNewWindow();
          break;
        case 3: // Open
          handleOpen();
          break;
        case 4: // Save
          handleSave();
          break;
        case 5: // Save As
          handleSaveAs();
          break;
        case 6: // Print
          handlePrint();
          break;
        case 7: // Close Tab
          handleCloseTab();
          break;
        case 8: // Close Window
          handleCloseWindow();
          break;
        default:
          break;
      }
    }

    // Handle Edit menu actions
    if (category === 'edit') {
      switch (id) {
        case 1: // Undo
          handleUndo();
          break;
        case 2: // Redo
          handleRedo();
          break;
        case 3: // Cut
          handleCut();
          break;
        case 4: // Copy
          handleCopy();
          break;
        case 5: // Paste
          handlePaste();
          break;
        case 6: // Find
          handleFind();
          break;
        default:
          break;
      }
    }

    // Handle View menu actions
    if (category === 'view') {
      switch (id) {
        case 1: // Zoom In
          handleZoomIn();
          break;
        case 2: // Zoom Out
          handleZoomOut();
          break;
        case 3: // Word Wrap
          handleToggleWordWrap();
          break;
        case 4: // Status Bar
          handleToggleStatusBar();
          break;
        default:
          break;
      }
    }

    // Unset showMenu to close it after every click
    setShowMenu(undefined);
  };

  const renderNotepadMenu = () => {
    if (showMenu === 'file') {
      return (
        <NotepadMenu
          menuItems={Object.entries(FILE_MENU_ITEMS).map(
            ([_key, value]) => value
          )}
          isOpen
          onClose={handleNotepadMenuClose}
        />
      );
    }
    if (showMenu === 'edit') {
      return (
        <NotepadMenu
          menuItems={Object.entries(EDIT_MENU_ITEMS).map(([_key, value]) => ({
            ...value,
            // Enable/disable based on context
            isDisabled:
              value.id === 1
                ? undoStack.length === 0 // Undo
                : value.id === 2
                  ? redoStack.length === 0 // Redo
                  : value.id === 3 || value.id === 4
                    ? !hasSelection // Cut/Copy
                    : false, // Paste and Find always enabled
          }))}
          isOpen
          onClose={handleNotepadMenuClose}
        />
      );
    }
    if (showMenu === 'view') {
      return (
        <NotepadMenu
          menuItems={Object.entries(VIEW_MENU_ITEMS).map(([_key, value]) => ({
            ...value,
            isToggled:
              value.id === 3
                ? wordWrap
                : value.id === 4
                  ? !hideStatusBar
                  : false,
          }))}
          isOpen
          onClose={handleNotepadMenuClose}
        />
      );
    }
    return null;
  };

  return (
    <div className="notepad">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt"
        onChange={handleFileRead}
        style={{ display: 'none' }}
      />
      <div className="notepad__header">
        <button
          type="button"
          onClick={() => {
            setShowMenu((prev) => (prev === 'file' ? undefined : 'file'));
          }}
          className={`notepad__header-button ${showMenu === 'file' ? 'active' : ''}`}
        >
          File
        </button>
        <button
          type="button"
          onClick={() => {
            setShowMenu((prev) => (prev === 'edit' ? undefined : 'edit'));
          }}
          className={`notepad__header-button ${showMenu === 'edit' ? 'active' : ''}`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => {
            setShowMenu((prev) => (prev === 'view' ? undefined : 'view'));
          }}
          className={`notepad__header-button ${showMenu === 'view' ? 'active' : ''}`}
        >
          View
        </button>
        {renderNotepadMenu()}
      </div>
      <textarea
        ref={textareaRef}
        className="notepad__input-area"
        value={content}
        onChange={handleTextareaChange}
        onClick={handleTextareaClick}
        onKeyUp={handleTextareaKeyUp}
        style={{
          fontSize: `${(zoomLevel / 100) * 14}px`,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowWrap: wordWrap ? 'break-word' : 'normal',
        }}
        placeholder="Start typing..."
      />
      <div className={`notepad__status-bar ${hideStatusBar ? 'hide' : ''}`}>
        <p className="notepad__status-bar-value">
          Ln {lineNumber}, Col {columnNumber}
        </p>
        <p className="notepad__status-bar-value">{content.length} characters</p>
        <p className="notepad__status-bar-value">Plain Text</p>
        <p className="notepad__status-bar-value">{zoomLevel}%</p>
        <p className="notepad__status-bar-value">UTF-8</p>
      </div>
    </div>
  );
}

export default Notepad;
