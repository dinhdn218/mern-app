import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthLayout, MainLayout } from './layouts';
import { publicRoutes, privateRoutes } from './routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Load public route */}
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = AuthLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* Load private route */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
