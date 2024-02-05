import ReactDOM from 'react-dom/client'
import './assets/index.css'
import './assets/editor.scss'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRoutes } from './routes'
import { TooltipProvider } from './components/ui/tooltip'
import { CommandProvider } from './contexts/CommandContext'
import { DialogProvider } from './contexts/DialogContext'
import { ApiProvider } from './contexts/ApiContext'
import { EventProvider } from './contexts/EventContext'
import { LoadingProvider } from './contexts/LoadingContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <TooltipProvider delayDuration={0}>
      <LoadingProvider>
        <EventProvider>
          <ApiProvider>
            <DialogProvider>
              <CommandProvider>
                <AppRoutes />
              </CommandProvider>
            </DialogProvider>
          </ApiProvider>
        </EventProvider>
      </LoadingProvider>
    </TooltipProvider>
  </ThemeProvider>
)
