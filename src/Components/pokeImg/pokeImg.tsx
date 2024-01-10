import { useState, useEffect } from 'react';
import './assets/pokeImg.css';

interface PokemonBallImgProps {
  alt: string;
  Img: string;
  Gif: string;
  isAnimated: boolean;
}

/**
 * This component is a Pokemon Ball that changes between an image and a gif when clicked.
 * @param {object} props - This is an object that contains all the properties of the component.
 * @param {string} props.alt - This is the alt text for the image.
 * @param {string} props.Img - This is the image source for the normal state.
 * @param {string} props.Gif - This is the image source for the animated state.
 * @param {boolean} props.isAnimated - This is a boolean that determines whether the component is in the normal or animated state.
 * @returns {JSX.Element} - This is the JSX code for the Pokemon Ball component.
 */
function PokemonBallImg(props: PokemonBallImgProps): JSX.Element {
  const [showPoke, setShowPoke] = useState(true);
  const [pic, setPic] = useState(false);
  const switchPicture = () => {
    setPic(!pic);
  };
  function animationEnd() {
    setTimeout(() => {
      setShowPoke(false);
    }, 1000 * 0.5);
    setTimeout(() => {
      setShowPoke(true);
      if (!props.isAnimated) {
        switchPicture();
      }
    }, 1000 * 4);
  }

  useEffect(() => {


  }, [props.isAnimated]);

  return (
    <div className="Shaw-poke" onClick={switchPicture}>
      <main
        className={`pokeball`}
        onAnimationEnd={props.isAnimated?animationEnd:undefined}>
        <img
          style={{ visibility: showPoke ? 'visible' : 'hidden' }}
          alt={props.alt}
          id='poke-image'
          src={!pic ? props.Gif : props.Img}
          height={!pic ? '90%' : '110%'}
        />
      </main>
    </div>
  );
}

export default PokemonBallImg;
