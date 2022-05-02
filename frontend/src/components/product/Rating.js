import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
const Rating = ({ value, text }) => {
  return [...Array(5)].map((ignore, index) => {
    return (
      <span key={index} className="text-yellow-500">
        {value >= index + 1 ? (
          <BsStarFill className="" />
        ) : value >= index + 0.5 ? (
          <BsStarHalf className="" />
        ) : (
          <BsStar className="" />
        )}
      </span>
    );
  });
};

export default Rating;
