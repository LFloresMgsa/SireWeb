// Menu.tsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { MenuItem } from "./menuDatatypes";
import ListItemIcon from '@mui/material/ListItemIcon';

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Arrow from '@mui/icons-material/TrackChanges';
import '../../css/AppBarMenuStyles.css';

interface MenuProps {
    menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {

    const [expandedItem, setExpandedItem] = useState<string | false>(false);

    const handleAccordionChange = (url: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpandedItem(isExpanded ? url : false);
    };


    return (
        <List>
            {menuItems.map((item) => (
                <Accordion
                    key={item.url}
                    expanded={expandedItem === item.url}
                    onChange={handleAccordionChange(item.url)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>

                        <ListItemText primary={item.label} className='custom-bar-text' />

                    </AccordionSummary>
                    <AccordionDetails>
                        {item.children.length > 0 && (
                            <List>{renderSubMenu(item.children)}</List>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Outlet />
        </List>
    );
};

const renderSubMenu = (items: MenuItem[]) => {

    return items.map((item) => (
        <ListItem
            key={item.url}
            button
            component={Link}
            to={item.url}>

            <ListItemIcon>
                {item.parent === 2 && (<Arrow className='custom-icons'/>)}

            </ListItemIcon>
            <ListItemText primary={item.label} className='custom-bar-text'/>

        </ListItem>
    ));
};


export default Menu;
