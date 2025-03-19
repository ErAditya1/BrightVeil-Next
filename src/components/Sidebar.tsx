'use client'
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import FaceIcon from '@mui/icons-material/Face';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { closeSidebar, toggleSidebar } from '@/lib/utils';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import User from './User';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import SidebarTop from './SidebarTop';
import { BiSolidBookContent } from 'react-icons/bi';
import { SiApostrophe } from 'react-icons/si';
import { Video } from 'lucide-react';
import { handleSidebar } from '@/store/setting/settingSlice';



function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  React.useEffect(() => setOpen(false), []);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const {isSideBar} = useAppSelector(state => state.setting)
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event:any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if(window.screen.width<=900)dispatch(handleSidebar(false));
    }
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickMenu = (event:any) => {
      if(window.screen.width<=900)dispatch(handleSidebar(false));
    
  };

  const dispatch = useAppDispatch();



  const menuItem = [

    {
      label: 'Dashboard',
      href: `/${user?.role}`,
      icon: <DashboardRoundedIcon />,
      visible: ['role']
    },
    {
      label: 'Home',
      href: '/',
      icon: <HomeRoundedIcon />,
      visible: ['admin', 'user','student', 'teacher', 'parent']
    },
    {
      label: 'Courses',
      href: '/courses',
      icon: <CastForEducationIcon />,
      visible: ['admin', 'user','student', 'teacher', 'parent']
    },
    {
      label: 'Posts',
      href: '/posts',
      icon: <SiApostrophe />,
      visible: ['admin', 'user','student', 'teacher', 'parent']
    },
    {
      label: 'Messages',
      href: '/chat',
      icon: <QuestionAnswerRoundedIcon />,
      visible: ['admin', 'user','student', 'teacher', 'parent']
    },
    {
      label: 'User',
      icon: <GroupRoundedIcon />,
      visible: ['admin', 'user','student', 'teacher', 'parent'],
      subMenu: [
        {
          label: 'Profile',
          href: '/user/profile',
          icon: <FaceIcon />,
          visible: [ 'user','student', 'teacher', 'parent'],
        },
        {
          label: 'Edit Profile',
          href: '/user/edit-profile',
          icon: <PersonAddIcon />,
          visible: ['admin', 'user','student', 'teacher', 'parent'],
        },

      ]
    },
    {
      label: 'Manage Content',
      icon: <BiSolidBookContent />,
      visible: [ 'admin', 'teacher'],
      subMenu: [
        {
          label: 'Courses',
          href: `/${user?.role}/courses`,
          icon: <CastForEducationIcon />,
          visible: ['admin','teacher'],
        },
        {
          label: 'Posts',
          href: `/${user?.role}/posts`,
          icon: <SiApostrophe />,
          visible: ['admin'],
        },
        {
          label: 'Videos',
          href: `/${user?.role}/chapters`,
          icon: <Video />,
          visible: ['admin'],
        },

      ]
    },

  ]



  return (

    <Sheet
      sx={{
        position: { xs: 'fixed', md: `${isSideBar && 'sticky'}` },
        transform: isSideBar ? 'translateX(0)': 'translateX(-100%)', 
        transition: 'transform 0.4s ease', // Smooth transition
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        zIndex: 500,
      }}
      ref={sidebarRef}
      className={`Sidebar dark:bg-card text-foreground z-20 transition-transform duration-400 ease-in-out`}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />

     
      <SidebarTop />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {menuItem.map((item, index) => {
            if (item.visible.includes(user?.role!)) {
              if (item.subMenu) {
                return (
                  <ListItem nested key={index}>
                    <Toggler
                      defaultExpanded
                      renderToggle={({ open, setOpen }) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                          {item.icon}
                          <ListItemContent>
                            <Typography level="title-sm">{item.label}</Typography>
                          </ListItemContent>
                          <KeyboardArrowDownIcon
                            sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                          />
                        </ListItemButton>
                      )}
                    >
                      <List>
                        {item.subMenu.map((subItem, index) => {
                          if (item.visible.includes(user?.role!)) {
                            return (
                              <ListItem key={index}>
                                <Link
                                  href={subItem.href}
                                  className="w-full"
                                  onClick={handleClickMenu}
                                >
                                  <ListItemButton>
                                    {subItem.icon}
                                    <ListItemContent>
                                      <Typography className="text-xs">{subItem.label}</Typography>
                                    </ListItemContent>
                                  </ListItemButton>
                                </Link>
                              </ListItem>
                            );
                          }
                        })}
                      </List>
                    </Toggler>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={index}>
                    <Link
                      href={item.href}
                      className="w-full"
                      onClick={handleClickMenu}
                    >
                      <ListItemButton>
                        {item.icon}
                        <ListItemContent>
                          <Typography level="title-sm">{item.label}</Typography>
                        </ListItemContent>
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              }
            }
          })}
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <Link href={'/support'} className="w-full" onClick={handleClickMenu}>
              <ListItemButton>
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleClickMenu}>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {user && <User user={user} />}
      </Box>
    </Sheet>
  );
}