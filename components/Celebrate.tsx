import Lottie from 'react-lottie';

const Celebrate = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('../public/celebrate.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <div>
    <Lottie options={defaultOptions}
      height={400}
      width={400}
    />
  </div>
}

export default Celebrate