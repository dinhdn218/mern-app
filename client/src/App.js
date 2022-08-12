import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import { AuthLayout, MainLayout } from './layouts';
import { privateRoutes, publicRoutes } from './routes';

function App() {
  const [waiting, setWaiting] = useState(false);

  return (
    <Router>
      <Toast />

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
                  <Layout waiting={waiting}>
                    <Page setWaiting={setWaiting} />
                  </Layout>
                }
              />
            );
          })}

          {/* Load private route */}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const Provider = route.provider;
            let element;

            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            if (Provider) {
              element = (
                <ProtectedRoute>
                  <Layout>
                    <Provider>
                      <Page />
                    </Provider>
                  </Layout>
                </ProtectedRoute>
              );
            } else {
              element = (
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              );
            }
            return <Route key={index} path={route.path} element={element} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
