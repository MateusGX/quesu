import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomeScreen } from './screens/home'
import { SidebarLayout } from './layouts/SidebarLayout'
import { SettingsScreen } from './screens/settings'
import { SidebarLayoutWithHeader } from './layouts/SidebarLayoutWithHeader'
import { EditorScreen } from './screens/editor'

export const AppRoutes: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<EditorScreen />} />
        </Route>
        <Route path="/settings" element={<SidebarLayoutWithHeader />}>
          <Route index element={<SettingsScreen />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
