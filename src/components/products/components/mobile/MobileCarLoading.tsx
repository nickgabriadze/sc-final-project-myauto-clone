import mobileCarStyling from "./mobileCar.module.css";

function MobileCarLoading() {
  return (
    <div className={mobileCarStyling['m-skeleton']}>
      <div className={mobileCarStyling["mobile-car-loading-skeleton"]}>
        <div className={mobileCarStyling["m-skeleton-1"]}>
          <div className={mobileCarStyling["vip-skeleton"]}></div>
          <div className={mobileCarStyling["model-year-skeleton"]}></div>
        </div>

        <div className={mobileCarStyling["m-skeleton-2"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={mobileCarStyling["m-skeleton-3"]}></div>

        <div className={mobileCarStyling["m-skeleton-4"]}>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div></div>
        </div>
      </div>

      <div className={mobileCarStyling["m-skeleton-5"]}>
        <div>
          <div className={mobileCarStyling['m-skeleton-icon']}></div>
          <div className={mobileCarStyling['m-text-skeleton']}></div>
          <div className={mobileCarStyling['m-text-skeleton']}></div>
        </div>

        <div>
          <div className={mobileCarStyling['m-skeleton-icon']}></div>
          <div className={mobileCarStyling['m-skeleton-icon']}></div>
        </div>
      </div>
      </div>
    
  );
}

export default MobileCarLoading;
