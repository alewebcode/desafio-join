// MUI Imports
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

// Type Imports
import type { VerticalMenuContextProps } from "@menu/components/vertical-menu/Menu";

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from "@menu/vertical-menu";

// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";

type RenderExpandIconProps = {
  open?: boolean;
  transitionDuration?: VerticalMenuContextProps["transitionDuration"];
};

const RenderExpandIcon = ({
  open,
  transitionDuration,
}: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="ri-arrow-right-s-line" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({
  scrollMenu,
}: {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
}) => {
  // Hooks
  const theme = useTheme();
  const { isBreakpointReached, transitionDuration } = useVerticalNav();

  return (
    <Menu
      menuItemStyles={menuItemStyles(theme)}
      renderExpandedMenuItemIcon={{ icon: <i className="ri-circle-line" /> }}
      menuSectionStyles={menuSectionStyles(theme)}
    >
      <MenuSection label="Cadastros">
        <MenuItem href="/categories">Categorias</MenuItem>
        <MenuItem href="/products">Produtos</MenuItem>
      </MenuSection>
    </Menu>
  );
};

export default VerticalMenu;
