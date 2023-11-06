import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import '@components/scss/CommandMenu.scss';
import { KBarAnimator, KBarPortal, KBarPositioner, KBarSearch } from 'kbar';
import {
  useKmenu,
  Command,
  useCommands,
  CommandWrapper,
  CommandMenu,
} from 'kmenu';
import {
  FiAlertCircle,
  FiCode,
  FiCommand,
  FiCopy,
  FiDribbble,
  FiEdit2,
  FiFacebook,
  FiGitBranch,
  FiGithub,
  FiGitPullRequest,
  FiLinkedin,
  FiMessageCircle,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShare,
  FiTwitter,
  FiZap,
  FiPackage,
} from 'react-icons/fi';
import { createEvent } from 'react-event-hook';
import { Page, PageMeta } from '@blocksuite/store';
import quesuContext from '../../../misc/window/quesuContextApi';
import { useNavigate } from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import Swal from 'sweetalert2';

type Props = {};

const MenuWrapper: React.FC<Props> = (props) => {
  const { emitNewPage } = createEvent('new-page')();
  const { emitSelectPage } = createEvent('select-page')<string>();
  const { useListPageListener } = createEvent('list-page')<Array<PageMeta>>();
  const { emitSaveWorkspace } = createEvent('save-workspace')<Id>();
  const { emitOpenWorkspace } = createEvent('open-workspace')<{
    id: string;
    notification: Id;
  }>();
  const { emitCreateWorkspace } = createEvent('create-workspace')<Id>();
  const { setOpen } = useKmenu();
  const [loading, setLoading] = useState(false);

  const [darkTheme, setDarkTheme] = useState(true);

  const { useThemeChangedListener } = createEvent('theme-changed')();

  const [currentWorkspace, setCurrentWorkspace] = useState<string | null>(null);

  const { useCurrentWorkspaceListener } =
    createEvent('current-workspace')<string>();

  useCurrentWorkspaceListener((workspace: string) => {
    setCurrentWorkspace(workspace);
  });

  const update = () => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  };

  useThemeChangedListener(() => {
    update();
  });

  const workspacesCommand: Command[] = [];

  const [workspaceCommands, setWorkspaceCommands] =
    useCommands(workspacesCommand);

  const main: Command[] = [];

  const [mainCommands, setCommands] = useCommands(main);

  useListPageListener((pages: Array<PageMeta>) => {
    const commands: Command[] = [
      {
        category: 'Actions',
        commands: [
          {
            text: 'Create New Page',
            icon: <FiPackage />,
            perform: () => {
              emitNewPage();
            },
          },
        ],
      },
      {
        category: 'Workspace',
        commands: [
          {
            text: 'Open Workspace',
            icon: <FiPackage />,
            perform: async () => {
              setOpen(2);
              setWorkspaceCommands([]);
              setLoading(true);
              const data = await quesuContext.get_workspaces();
              setWorkspaceCommands([
                {
                  category: 'Workspaces',
                  commands: data.map((workspace: any) => ({
                    text: workspace.name,
                    icon: <FiPackage />,
                    perform: async () => {
                      setLoading(true);
                      const t = toast('Opening Workspace...', {
                        theme: darkTheme ? 'dark' : 'light',
                        type: 'info',
                        autoClose: false,
                      });
                      emitOpenWorkspace({
                        id: workspace.id,
                        notification: t,
                      });
                      setLoading(false);
                    },
                  })),
                },
              ]);
              setLoading(false);
            },
          },
          {
            text: 'Create New Workspace',
            icon: <FiPackage />,
            perform: () => {
              const t = toast('Creating Workspace...', {
                theme: darkTheme ? 'dark' : 'light',
                type: 'info',
                autoClose: false,
              });
              emitCreateWorkspace(t);
            },
          },
          {
            text: 'Rename Workspace',
            icon: <FiPackage />,
            perform: () => {
              Swal.fire({
                title: 'Enter workspace name',
                input: 'text',
                inputValue:
                  localStorage.getItem('workspace-name') || 'Untitled',
                showCancelButton: true,
                inputValidator: (value) => {
                  if (
                    !value ||
                    value.trim().length == 0 ||
                    value.includes('/') ||
                    value.includes('.')
                  ) {
                    return 'You need to write something!';
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  quesuContext.rename_workspace(
                    localStorage.getItem('workspace'),
                    result.value!,
                  );
                  localStorage.setItem('workspace-name', result.value!);
                  const t = toast('Workspace Renamed', {
                    theme: darkTheme ? 'dark' : 'light',
                    type: 'success',
                    autoClose: 1500,
                  });
                }
              });
            },
          },
          {
            text: 'Save Workspace',
            icon: <FiPackage />,
            perform: () => {
              const t = toast('Saving Workspace...', {
                theme: darkTheme ? 'dark' : 'light',
                type: 'info',
                autoClose: false,
              });
              emitSaveWorkspace(t);
            },
          },
        ],
      },
      {
        category: 'Pages',
        commands: [
          ...pages.map((page) => {
            return {
              text: page.title || 'Untitled',
              icon: <FiPackage />,
              perform: () => {
                console.log('page', page);
                emitSelectPage(page.id);
              },
            };
          }),
        ],
      },
    ];

    setCommands(commands);
  });

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={['Editor']} />
      <CommandMenu
        loadingState={loading}
        commands={workspaceCommands}
        index={2}
        crumbs={['Editor', 'Workspaces']}
      />
    </CommandWrapper>
  );
};

export default MenuWrapper;
