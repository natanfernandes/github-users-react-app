import React from 'react';
import ButtonAppBar from './components/AppBar/index';
import AppRoutes from './routes/index';

// monta toda a aplicação de acordo com as rotas e sempre traz a AppBar
function App() {
  return (
    <div>
      <ButtonAppBar />
      <AppRoutes />
    </div>
  );
}

export default App;
