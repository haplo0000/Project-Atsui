import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { commandService } from '@/services/CommandService';
import './CommandPanel.css';

interface CommandPanelProps {
  onSubmit?: (input: string) => void;
  onFocusChange?: (focused: boolean) => void;
}

export function CommandPanel({ onSubmit, onFocusChange }: CommandPanelProps) {
  const [value, setValue] = useState('');

  const submit = () => {
    const input = value.trim();
    if (!input) return;
    commandService.execute(input);
    onSubmit?.(input);
    setValue('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form className="command-panel" onSubmit={handleSubmit}>
      <span className="command-panel-prompt">&gt;</span>
      <input
        className="command-panel-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => onFocusChange?.(true)}
        onBlur={() => onFocusChange?.(false)}
        placeholder="analyze NVDA"
        spellCheck={false}
        autoComplete="off"
        aria-label="Command input"
      />
    </form>
  );
}
