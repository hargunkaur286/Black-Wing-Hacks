import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import notes from '../assets/notes.png'

const CardDeal = () => (
  <>
  <section className={`${layout.section} pt-20`}>
    <div className={`${layout.sectionInfo}`}>
      <h2 className={styles.heading2}>
      Transforming Education: Seamlessly Connecting  <br className="sm:block hidden" /> Curiosity with Cutting-Edge Technology.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
        aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={notes} alt="billing" className="w-[400px] h-[400px]" />
    </div>
  </section>
  </>
  
);

export default CardDeal;
