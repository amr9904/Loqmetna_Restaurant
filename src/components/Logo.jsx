import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)(({ theme }) => ({
	fontFamily: '"Noto Kufi Arabic", "Cairo", sans-serif',
	fontWeight: 700,
	fontStyle: "italic",
	background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
	fontSize: "2.5rem",
	letterSpacing: "0.5px",
	transition: "all 0.2s",
	"&:hover": {
		background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
	},
}));

const Logo = () => (
	<Box sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
		<LogoText variant="h4" component="h1">
			لقمتنا
		</LogoText>
	</Box>
);

export default Logo;
