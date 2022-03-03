import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Topbar from './components/shop/layout/Topbar'
import Navbars from './components/shop/layout/Navbar'
import Footer from './components/shop/layout/Footer'
import HomePage from './components/shop/home'
import Profile from './components/profile'
import Auth from './views/Auth'
import AuthContextProvider from './components/shop/auth/AuthContext'
import RequireAuth from './components/routing/RequireAuth'
import NotFound from './components/shop/layout/NotFound'
import PostContextProvider from './components/blog/context/PostContext'
import HomeBlog from './components/blog/home'
import BlogDetails from './components/blog/home/BlogDetails'
import BlogAdd from './components/blog/home/BlogAdd'
import BlogAll from './components/blog/home/BlogAll'
import EditBlog from './components/blog/home/EditBlog'
import './App.css'
import ProductAdd from './components/shop/product/ProductAdd'
import CateAdd from './components/shop/categories/CateAdd'
import CateContextProvider from './components/shop/categories/cateContext'
import Categories from './components/shop/categories'
import ProductContextProvider from './components/shop/product/ProductContext'
import ProductDetail from './components/shop/product/ProductDetail'
import ShopPage from './components/shop/home/shopPage'
import Cart from './components/shop/order/Cart'
import CartContextProvider from './components/shop/order/CartContext'
import CheckOut from './components/shop/order/CheckOut'
import RequireAdmin from './components/routing/RequireAdmin'
import AdminPage from './components/admin'
import AdminProduct from './components/admin/AdminProduct'
import AdminBlog from './components/admin/AdminBlog'
import AdminCatalog from './components/admin/AdminCatalog'
import AdminUser from './components/admin/AdminUser'
import AdminSetting from './components/admin/AdminSetting'
import AdminViewProduct from './components/admin/AdminViewProduct'
import AdminEditProduct from './components/admin/AdminEditProduct'
import CateEdit from './components/shop/categories/CateEdit'
import AdminViewBlog from './components/admin/AdminViewBlog'
import ProductAll from './components/shop/product/ProductAll'
import UpdateInfo from './components/profile/UpdateInfo'
import NapRut from './components/profile/NapRut'
import AdminCash from './components/admin/AdminCash'
const App = () => {
  return (
    <>
    <AuthContextProvider>
      <PostContextProvider>
        <CateContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
    <Navbars />
    	<Router>
					<Routes>
            <Route path='*' element={<NotFound />} />
						<Route path='/' element={<HomePage/>} />
            <Route path='/cash' element={<RequireAuth><NapRut /></RequireAuth>} />
            {/* BLog */}
            <Route path='/blog' element={<HomeBlog/>} />
            <Route path='/blog/add' element={<RequireAuth><BlogAdd/></RequireAuth>} />
            <Route path='/blog/all' element={<RequireAuth><BlogAll/></RequireAuth>} />
            <Route path="/blog/:id" element={<BlogDetails/>} />
            <Route path="/blog/edit/:id" element={<EditBlog/>} />
             
             {/* Product Shop */}
            <Route path='/shop' element={<ShopPage/>} />
            <Route path='/product/add' element={<RequireAuth><ProductAdd/></RequireAuth>} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path='/cart' element={<RequireAuth><Cart/></RequireAuth>} />
            {/* Categories */}
            <Route path='/categories' element={<Categories/>} />
            <Route path="/categories/:id" element={<BlogDetails/>} />
            
            {/* Checkout */}
            <Route path='/checkout' element={<RequireAuth><CheckOut/></RequireAuth>} />
            <Route path='/checkout/:id' element={<RequireAuth><CheckOut/></RequireAuth>} />
           
            {/* Auth */}
            <Route path='/login' element={<Auth authRoute='login' />} />
						<Route path='/register' element={<Auth authRoute='register' />} />
            <Route path='/profile' element={<RequireAuth> <Profile/> </RequireAuth>} />
            <Route path='/profile/blogs' element={<RequireAuth> <BlogAll/> </RequireAuth>} />
            <Route path='/profile/products' element={<RequireAuth> <ProductAll /> </RequireAuth>} />
            <Route path='/profile/info' element={<RequireAuth> <UpdateInfo /> </RequireAuth>} />
            <Route path='/profile/:id' element={ <Profile/>} />

            {/* Admin */}
            
            <Route path='/admin' element={<RequireAdmin><AdminPage/></RequireAdmin>} />
            <Route path='/admin/products' element={<RequireAdmin><AdminProduct/></RequireAdmin>} />
            <Route path='/admin/blogs' element={<RequireAdmin><AdminBlog/></RequireAdmin>} />
            <Route path='/admin/blogs/view/:id' element={<RequireAdmin><AdminViewBlog/></RequireAdmin>} />
           
            <Route path='/admin/categories' element={<RequireAdmin><AdminCatalog/></RequireAdmin>} />
            <Route path='/admin/categories/add' element={<RequireAdmin><CateAdd/></RequireAdmin>} />
          
            <Route path='/admin/users' element={<RequireAdmin><AdminUser/></RequireAdmin>} />
            <Route path='/admin/setting' element={<RequireAdmin><AdminSetting/></RequireAdmin>} />
            <Route path='/admin/cash' element={<RequireAdmin><AdminCash/></RequireAdmin>} />
            <Route path='/admin/product/view/:id' element={<RequireAdmin><AdminViewProduct/></RequireAdmin>} />
              
          </Routes>
				</Router>
        <Footer />
        </CartContextProvider>
        </ProductContextProvider>
        </CateContextProvider>
        </PostContextProvider>
        </AuthContextProvider>
    </>
  )
}


export default App
