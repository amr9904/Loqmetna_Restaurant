import { useMemo } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Logo from "./components/Logo";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Container } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import SearchMenu from "./pages/SearchMenu";
import PurchasesCart from "./pages/purchasesCart";

function AppContent() {
	const location = useLocation();
	return (
		<Container
			maxWidth={false}
			sx={{
				width: { xs: "98vw", sm: "65vw" },
				maxWidth: { sm: 1200 },
				mx: "auto",
				bgcolor: "#fff",
				borderRadius: 4,
				boxShadow: 3,
				px: { xs: 1, sm: 3, md: 6 },
				py: { xs: 1, sm: 3, md: 4 },
				minHeight: "80vh",
			}}
		>
			{/* Only show logo/title/desc if not on purchasesCart */}
			{location.pathname !== "/purchasesCart" && (
				<Box
					sx={{
						width: "100%",
						mb: 3,
						mt: { xs: 8, md: 11 },
						textAlign: "right",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row-reverse",
							alignItems: "center",
							justifyContent: "flex-start",
							gap: 2,
							width: "100%",
						}}
					>
						<Box sx={{ flex: "0 0 80px" }}>
							<img
								src="data:image/png;base64,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"
								alt="شعار المطعم"
								style={{
									width: 80,
									height: 80,
									borderRadius: 16,
									objectFit: "cover",
									boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
								}}
							/>
						</Box>
						<span
							style={{
								fontFamily: "Noto Kufi Arabic, Cairo, sans-serif",
								fontWeight: 900,
								fontStyle: "italic",
								fontSize: "2.2rem",
								color: "#982121",
								letterSpacing: "0.5px",
								display: "block",
								marginRight: 16,
							}}
						>
							لقمتنا
						</span>
					</Box>
					<span
						style={{
							fontSize: "1rem",
							color: "#555",
							fontFamily: "inherit",
							display: "block",
							marginTop: 8,
							textAlign: "right",
							whiteSpace: "nowrap",
						}}
					>
						مطعم متخصص في أشهى المأكولات الشرقية و الغربية
					</span>
				</Box>
			)}
			<main style={{ width: "100%" }}>
				<Routes>
					<Route path="/" element={<Menu />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/search" element={<SearchMenu />} />
					<Route path="/purchasesCart" element={<PurchasesCart />} />
				</Routes>
			</main>
		</Container>
	);
}

function App() {
	// Dynamic theme and cache
	const theme = useMemo(
		() =>
			createTheme({
				direction: "rtl",
				palette: {
					primary: {
						main: "#982121",
						light: "#e32929",
						dark: "#813531",
					},
					secondary: {
						main: "#ff611d",
						light: "#ffb80e",
					},
				},
				typography: {
					fontFamily: '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif',
				},
				components: {
					MuiCssBaseline: {
						styleOverrides: {
							body: {
								scrollbarColor: "#6b6b6b #2b2b2b",
								"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
									backgroundColor: "#2b2b2b",
								},
								"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
									borderRadius: 8,
									backgroundColor: "#6b6b6b",
									minHeight: 24,
									border: "3px solid #2b2b2b",
								},
								"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
									{
										backgroundColor: "#959595",
									},
							},
						},
					},
				},
			}),
		[]
	);

	const cacheRtl = useMemo(
		() =>
			createCache({
				key: "muirtl",
				stylisPlugins: [prefixer, rtlPlugin],
			}),
		[]
	);

	return (
		<CacheProvider value={cacheRtl}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<CartProvider>
					<Router>
						{/* Full-screen grey background */}
						<Box
							sx={{
								minHeight: "100vh",
								width: "100vw",
								bgcolor: "#f5f5f5",
								position: "fixed",
								top: 0,
								left: 0,
								zIndex: 0,
							}}
						/>
						{/* Main app content above background */}
						<Box
							sx={{
								position: "relative",
								zIndex: 1,
								minHeight: "100vh",
								width: "100vw",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									width: { xs: "98vw", sm: "65vw" },
									mx: "auto",
									maxWidth: 1200,
								}}
							>
								<Header />
							</Box>
							<AppContent />
						</Box>
					</Router>
				</CartProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default App;
