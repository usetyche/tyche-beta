function shortenAddress(address, chars = 9) {
  return `${address.substring(0, chars)}...`;
}

export default shortenAddress;
