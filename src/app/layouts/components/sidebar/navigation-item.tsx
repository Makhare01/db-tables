import { IconArrow } from "@app/assets/icons";
import { useBoolean } from "@lib/hooks";
import {
  Box,
  Collapse,
  IconButton,
  SvgIconProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export type Navigation = {
  title: string;
  Icon: (props: SvgIconProps) => JSX.Element;
  to: string;
  children?: Array<Navigation>;
  isSubItem?: boolean;
};

export const NavigationItem = ({
  title,
  Icon,
  to,
  children,
  isSubItem,
}: Navigation) => {
  const navigate = useNavigate();
  const isOpen = useBoolean();

  const isActive = location.pathname.includes(to);

  const navBgColor = isSubItem ? "transparent" : "primary.main";
  const activeTextColor = isSubItem ? "primary.main" : "white";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          borderRadius: 2,
          bgcolor: isActive ? navBgColor : "transparent",
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
          onClick={() => {
            navigate(to);
          }}
        >
          <Icon sx={{ color: isActive ? activeTextColor : "text.primary" }} />

          <Typography
            variant="body1"
            fontWeight={700}
            color={isActive ? activeTextColor : "text.primary"}
          >
            {title}
          </Typography>
        </Box>

        {children && children.length > 0 && (
          <IconButton onClick={isOpen.toggle}>
            <IconArrow
              direction={isOpen.isTrue ? "up" : "down"}
              sx={{
                color: isActive ? activeTextColor : "text.primary",
                fontSize: 14,
              }}
            />
          </IconButton>
        )}
      </Box>
      {children && (
        <Collapse
          orientation="vertical"
          in={isOpen.isTrue}
          sx={{
            mt: 1,
            ml: 2,
            borderLeft: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          {children.map((navItem) => (
            <NavigationItem
              key={navItem.to}
              {...navItem}
              to={to + navItem.to}
            />
          ))}
        </Collapse>
      )}
    </Box>
  );
};
