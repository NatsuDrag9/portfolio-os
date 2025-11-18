import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import * as GenericIcons from '@assets/images/generics';
import * as SpecificIcons from '@assets/images/specifics';

type IconsType = { [key: string]: string };

const sortIcons = (icons: IconsType): [string, string][] => {
  return Object.entries(icons).sort((a, b) => a[0].localeCompare(b[0]));
};

function IconsShowcase() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleBackground = () => setIsDarkMode(!isDarkMode);

  const renderIconSection = (title: string, icons: IconsType) => {
    const sortedIcons = sortIcons(icons);

    return (
      <div key={title}>
        <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>
          {title} Icons
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {sortedIcons.map(([name, Icon]) => (
            <div
              key={name}
              style={{
                border: `1px solid ${isDarkMode ? '#fff' : '#ccc'}`,
                padding: '10px',
                textAlign: 'center',
                backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: isDarkMode
                    ? 'rgb(236, 236, 236)'
                    : 'rgb(117, 117, 117)',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={Icon}
                  alt={name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{name}</p>
              <code
                style={{
                  fontSize: '12px',
                  display: 'block',
                  marginTop: '5px',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                }}
              >
                {`import { ${name} } from '@assets/images/${title.toLowerCase()}s'`}
              </code>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        padding: '20px',
      }}
    >
      <button
        type="button"
        onClick={toggleBackground}
        style={{ marginBottom: '20px' }}
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      {renderIconSection('Generic', GenericIcons as IconsType)}
      {renderIconSection('Specific', SpecificIcons as IconsType)}
    </div>
  );
}

const meta: Meta<typeof IconsShowcase> = {
  title: 'Design System/Icons',
  component: IconsShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof IconsShowcase>;

export const AllIcons: Story = {};
