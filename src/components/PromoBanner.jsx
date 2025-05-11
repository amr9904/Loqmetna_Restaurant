import { Box, Typography } from "@mui/material";
import PannerFood from "../assets/PannerFood.jpg"; // Make sure this path is correct

const PromoBanner = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "#ffb80e",
				borderRadius: 4,
				p: { xs: 1.5, md: 3 },
				boxShadow: 2,
				flexDirection: { xs: "column", md: "row" },
				mb: { xs: 3, md: 6 },
				gap: { xs: 1, md: 4 },
				"@media (max-width:959.9px)": {
					transform: "scale(0.85)",
					transformOrigin: "top center",
					mb: 0,
				},
			}}
		>
			{/* Image on the left */}
			<Box
				sx={{
					width: { xs: "100%", md: 240 },
					maxWidth: { xs: "100%", md: 260 },
					flexShrink: 0,
					overflow: "hidden",
					borderRadius: 4,
					alignSelf: { xs: "center", md: "flex-start" },
					mb: { xs: 1, md: 0 },
				}}
			>
				<img
					src={PannerFood}
					alt="Promo Food"
					style={{
						width: "100%",
						height: "auto",
						objectFit: "cover",
						borderRadius: "16px",
					}}
				/>
			</Box>

			{/* Text on the right */}
			<Box
				sx={{
					flexGrow: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "flex-end",
					gap: { xs: 1, md: 2 },
					mt: { xs: 1, md: 0 },
				}}
			>
				<Typography
					variant="h4"
					fontWeight={900}
					color="#982121"
					textAlign="right"
					sx={{ direction: "rtl", fontSize: { xs: 20, md: 32 } }}
				>
					%50 عرض خاص
				</Typography>

				<Typography
					variant="h6"
					fontWeight={700}
					color="#982121"
					textAlign="right"
					sx={{
						direction: "rtl",
						fontSize: { xs: 15, md: 22 },
						"@media (max-width:379.9px)": {
							fontSize: "14px",
						},
					}}
				>
					!احصل على خصم 50% على جميع الطلبات هذا الأسبوع
				</Typography>
			</Box>
		</Box>
	);
};

export default PromoBanner;
