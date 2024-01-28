import ReactDOM from 'react-dom/client'
import './assets/index.css'
import './assets/editor.scss'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRoutes } from './routes'
import { TooltipProvider } from './components/ui/tooltip'
import { CommandProvider } from './contexts/CommandContext'
import { DialogProvider } from './contexts/DialogContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <TooltipProvider delayDuration={0}>
      <DialogProvider>
        <CommandProvider>
          <AppRoutes />
        </CommandProvider>
      </DialogProvider>
    </TooltipProvider>
  </ThemeProvider>
)
