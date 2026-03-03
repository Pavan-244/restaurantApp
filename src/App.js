import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {CartProvider} from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Redirect to="/" />
      </Switch>
    </CartProvider>
  </BrowserRouter>
)

export default App
