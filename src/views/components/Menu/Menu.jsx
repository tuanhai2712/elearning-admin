import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { parentMenu } from 'routeConfig';
import { useSelector } from 'react-redux';
const { SubMenu } = Menu;

export default function MenuBar() {
  const history = useHistory();
  const { position } = useSelector((state) => state.users.profile);
  const goTo = (route) => {
    history.push(route);
  };

  return (
    <Menu theme="light" mode="inline">
      {parentMenu.map((item, itemIdx) => {
        if (item.position && !item.position.includes(position)) {
          return null;
        }
        if (item.single) {
          return (
            <Menu.Item
              selectable={true}
              key={itemIdx}
              icon={item.icon}
              onClick={() => goTo(item.path)}
            >
              {item.title}
            </Menu.Item>
          );
        } else {
          return (
            <SubMenu key={itemIdx} icon={item.icon} title={item.title}>
              {item.subItems.map((subItem, subItemIdx) => {
                if (subItem.position && !subItem.position.includes(position)) {
                  return null;
                }
                if (!subItem.hide) {
                  return (
                    <Menu.Item
                      key={`${itemIdx}-${subItemIdx}`}
                      onClick={() => goTo(subItem.path)}
                    >
                      {subItem.title}
                    </Menu.Item>
                  );
                }
                return null;
              })}
            </SubMenu>
          );
        }
      })}
    </Menu>
  );
}
