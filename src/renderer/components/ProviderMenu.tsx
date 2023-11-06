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
  MenuProvider,
  MenuConfig,
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
} from 'react-icons/fi';
import { createEvent } from 'react-event-hook';

import MenuWrapper from './MenuWrapper';

type Props = {};

const config: MenuConfig = {
  backdropColor: '#00000099',
  backgroundColor: 'var(--grey12)',
  backdropBlur: 0.1,
  borderWidth: 1,
  borderColor: 'var(--grey10)',
  inputBorder: 'var(--grey10)',
  inputColor: 'var(--grey1)',
  barBackground: '#FFFFFF10',
  headingColor: 'var(--grey8)',
  commandInactive: 'var(--grey8)',
  commandActive: '#FFFFFF',
  breadcrumbColor: 'var(--grey11)',
};

const ProviderMenu: React.FC<Props> = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const { useThemeChangedListener } = createEvent('theme-changed')();

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

  return (
    <MenuProvider
      config={darkTheme ? config : undefined}
      dimensions={{ commandHeight: 50, sectionHeight: 40 }}
    >
      <MenuWrapper />
    </MenuProvider>
  );
};

export default ProviderMenu;
