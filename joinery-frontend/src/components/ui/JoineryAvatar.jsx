import { Avatar, Tooltip } from '@mantine/core';

const JoineryAvatar = ({ user, size = 40 }) => {
  if (!user) return null;

  return (
    <Tooltip label={user.name} withArrow>
      <Avatar color={user.icon_color} radius="xl" size={size}>
        {user.initials}
      </Avatar>
    </Tooltip>
  );
}

export default JoineryAvatar;