/* eslint-disable react/prop-types */
import { Avatar, Card } from "flowbite-react";

const CardComponent = ({ title, leaves }) => {
  return (
    <Card>
      <h5 className="flex gap-2 justify-between items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
        <Avatar placeholderInitials={leaves} />
      </h5>
    </Card>
  );
};

export default CardComponent;
