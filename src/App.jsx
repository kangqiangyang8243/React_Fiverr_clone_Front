import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPage from "../src/pages/LayoutPage";
import HomePage from "./pages/HomePage";
import "swiper/swiper-bundle.css";
import SwiperCore, { Autoplay } from "swiper";
import SingleCatPage from "./pages/SingleCatPage";
import MyPostPage from "./pages/MyPostPage";
import CategoryPage from "./pages/CategoryPage";
import AddPostPage from "./pages/AddPostPage";
import OrderPage from "./pages/OrderPage";
import MessagesPage from "./pages/MessagesPage";
import SingleMessagePage from "./pages/SingleMessagePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import PaymentPage from "./pages/PaymentPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function App() {
  SwiperCore.use([Autoplay]);

  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutPage />}>
					<Route index element={<HomePage />} />
					<Route path="gigs" element={<CategoryPage />} />
					<Route path="gig/:gigId" element={<SingleCatPage />} />
					<Route path="mypost" element={<MyPostPage />} />
					<Route path="addpost" element={<AddPostPage />} />
					<Route path="orders" element={<OrderPage />} />
					<Route path="messages" element={<MessagesPage />} />
					<Route path="message/:messageId" element={<SingleMessagePage />} />
					<Route path="becomeSeller" element={<BecomeSellerPage />} />
					<Route path="pay/:gigId" element={<PaymentPage />} />
					<Route path="success" element={<PaymentSuccessPage />} />
				</Route>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>

			<ToastContainer position="bottom-center" theme="colored" draggable />
		</BrowserRouter>
	);
}

export default App;
