import PropTypes from "prop-types";
import goLinkIcon from "./../../assets/images/icons/goLinkIcon.svg";

function DAppCard({ dapp }) {
  const dappLink = dapp.link || "#"; // Fallback to "#" if the link is undefined

  return (
    <div className="flex flex-row items-center bg-white rounded-[20px] p-4 gap-[10px]">
      <div className="flex items-center justify-center min-w-[54px] min-h-[54px] max-w-[54px] max-h-[54px] rounded-full bg-tycheLightGray">
        <img
          src={dapp.image}
          alt={dapp.name}
          className="h-8 w-8"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="">
          <p className="text-[12px] font-bold text-black">{dapp.name}</p>
          <p className="text-[8px]">{dapp.description}</p>
        </div>
        <a href={dappLink}>
          <div className="flex flex-row items-center gap-[8px]">
            <p className="text-tycheBlue font-bold text-[12px]">Go</p>
            <img src={goLinkIcon} alt="Go Link" className="w-[12px] h-[12px]" />
          </div>
        </a>
      </div>
    </div>
  );
}

DAppCard.propTypes = {
  dapp: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired, // Ensure link is passed
  }).isRequired,
};

export default DAppCard;
