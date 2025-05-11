import { useState } from "react";
import {
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Tabs,
	Tab,
	Box,
	Chip,
	Button,
} from "@mui/material";
import { categories as originalCategories, menuItems } from "../data/menu";
import PromoBanner from "../components/PromoBanner";
import FoodItemCard from "../components/FoodItemCard";
import foodCardImage from "../assets/download.jpeg";
import AddToCartCard from "../components/AddToCartCard";
import StickyCartBar from "../components/StickyCartBar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const getCategoryLabel = (cat) => cat.ar;

const Menu = () => {
	const [selectedCategory, setSelectedCategory] = useState("weekly_offer");
	// const itemsPerPage = 8;
	// const page = 1;
	const [addToCartOpen, setAddToCartOpen] = useState(false);
	const [selectedFood, setSelectedFood] = useState(null);
	const navigate = useNavigate();
	const { cartItems } = useCart();

	const cartTotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	const desiredOrder = [
		"weekly_offer",
		"new",
		"meals",
		"burgers",
		"shawarma",
		"sides_salads",
		"desserts",
		"cold_drinks",
	];
	const categories = desiredOrder
		.map((id) => originalCategories.find((cat) => cat.id === id))
		.filter(Boolean);

	const handleCategoryChange = (event, newValue) => {
		setSelectedCategory(newValue);
	};

	// Example cards for weekly offer
	const defaultCard = {
		image: foodCardImage,
		title: "برجر لحم",
		desc: "برجر لحم شهي، مع جبنة ذائبة وصلصات خاصة داخل خبز طري ولذيذ.",
		price: 100,
		badge: null,
	};

	const getEightCards = (items) => {
		const filled = [...items];
		while (filled.length < 8) {
			filled.push({ ...defaultCard, id: `default-${filled.length}` });
		}
		return filled.slice(0, 8);
	};

	const filteredItems = menuItems
		.filter((item) => item.category === selectedCategory)
		.map((item) => ({
			id: item.id,
			image: item.image || defaultCard.image,
			title: item.title || (item.ar && item.ar.title) || defaultCard.title,
			desc: item.desc || (item.ar && item.ar.desc) || defaultCard.desc,
			price: item.price || defaultCard.price,
			badge: item.badge || null,
		}));

	const paginatedItems = getEightCards(filteredItems);

	const handleFoodClick = (item) => {
		setSelectedFood(item);
		setAddToCartOpen(true);
	};
	const handleCloseAddToCart = () => {
		setAddToCartOpen(false);
		setTimeout(() => setSelectedFood(null), 300); // after animation
	};

	return (
		<Box
			sx={{
				width: { xs: "98vw", sm: "65vw" },
				maxWidth: { sm: 1200 },
				mx: "auto",
				py: { xs: 1, md: 4 },
				overflowX: "hidden",
				px: { xs: 0.5, sm: 2 },
			}}
		>
			{/* Promo Banner */}
			<Box
				sx={{
					display: { md: "flex" },
					justifyContent: { md: "center" },
					p: { md: 2 },
				}}
			>
				<PromoBanner />
			</Box>
			{/* Category Tabs */}
			<Box
				sx={{
					bgcolor: "transparent",
					mb: { xs: 2, sm: 3 },
					overflowX: "auto",
					px: { xs: 0, sm: 1 },
				}}
			>
				<Tabs
					value={selectedCategory}
					onChange={handleCategoryChange}
					variant="scrollable"
					scrollButtons="auto"
					TabIndicatorProps={{
						style: { background: "#982121", height: 4, borderRadius: 2 },
					}}
					sx={{
						direction: "ltr",
						"& .MuiTab-root": {
							minWidth: { xs: 90, sm: 120 },
							fontWeight: 700,
							color: "#fff",
							bgcolor: "#982121",
							borderRadius: 3,
							mx: 0.5,
							py: { xs: 0.7, sm: 1.2 },
							px: { xs: 1, sm: 2 },
							fontFamily: "inherit",
							fontSize: { xs: 13, sm: 16 },
							transition: "all 0.2s",
							"& .category-label": {
								color: "#fff !important",
							},
						},
						"& .MuiTab-root:hover": {
							bgcolor: "#ffb80e",
							border: "none",
						},
						"& .Mui-selected": {
							bgcolor: "#ffb80e",
							transform: "scale(1.05)",
							boxShadow: "none",
							border: "none",
						},
						mb: 2,
					}}
				>
					{categories.map((cat) => (
						<Tab
							key={cat.id}
							label={
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<span>{cat.icon}</span>
									<span className="category-label">
										{getCategoryLabel(cat)}
									</span>
								</Box>
							}
							value={cat.id}
						/>
					))}
				</Tabs>
			</Box>

			{/* Menu Items List */}
			<Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 0, sm: 2 } }}>
				<Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
					{paginatedItems.map((item, idx) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							xl={3}
							key={item.id || idx}
							display="flex"
							justifyContent="center"
						>
							<FoodItemCard
								image={item.image}
								title={item.title}
								desc={item.desc}
								price={item.price}
								badge={item.badge}
								cardBg="#f7f7f7"
								onClick={() => handleFoodClick(item)}
							/>
						</Grid>
					))}
				</Grid>
				<AddToCartCard
					open={addToCartOpen}
					onClose={handleCloseAddToCart}
					food={selectedFood}
				/>
			</Box>
			{!addToCartOpen && cartQuantity > 0 && (
				<StickyCartBar
					total={cartTotal}
					quantity={cartQuantity}
					onClick={() => navigate("/purchasesCart")}
				/>
			)}
		</Box>
	);
};

export default Menu;
