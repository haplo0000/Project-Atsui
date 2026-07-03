import { CommandConsole } from '@/ui/CommandConsole';
import { CommandPanel } from '@/ui/CommandPanel';
import { useConsole } from '@/hooks/useConsole';
import './CommandInterface.css';

export function CommandInterface() {
  const entries = useConsole();

  return (
    <div className="command-interface">
      <CommandConsole entries={entries} />
      <CommandPanel />
    </div>
  );
}
