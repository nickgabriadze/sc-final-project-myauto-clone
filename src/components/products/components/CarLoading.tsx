import carProductsStyling from "../carProducts.module.css";
import MobileCarLoading from "./mobile/MobileCarLoading";

function CarLoading() {
  return (
    <>
    <div className={carProductsStyling["skeleton-wrapper"]}>
      <div className={carProductsStyling["img-skeleton"]}></div>

      <div className={carProductsStyling["car-info-skeleton"]}>
        <div className={carProductsStyling["car-header-skeleton"]}>
          <div className={carProductsStyling["for-rent-model-skeleton"]}>
            <div className={carProductsStyling["for-rent-skeleton"]}></div>
            <div className={carProductsStyling["model-year-skeleton"]}></div>
          </div>
          <div className={carProductsStyling["location-skeleton"]}></div>
        </div>

        <div className={carProductsStyling["middle-section-skeleton"]}>
          <div className={carProductsStyling["middle-skeleton-1"]}>
            <div className={carProductsStyling["mk-1"]}></div>
            <div className={carProductsStyling["mk-2"]}></div>
          </div>

          <div className={carProductsStyling["middle-skeleton-2"]}>
            <div className={carProductsStyling["mk-1"]}></div>
            <div className={carProductsStyling["mk-2"]}></div>
          </div>

          <div className={carProductsStyling["middle-skeleton-3"]}>
            <div className={carProductsStyling["mk-1"]}></div>
            <div className={carProductsStyling["mk-2"]}></div>
          </div>
        </div>

        <div className={carProductsStyling["bottom-section-skeleton"]}>
          <div className={carProductsStyling["views-date-skeleton"]}>
            <div className={carProductsStyling['views-skeleton']}></div>
            <div className={carProductsStyling['date-skeleton']}></div>
          </div>

          <div className={carProductsStyling['icons-skeleton']}>
            <div className={carProductsStyling['is-1']}></div>
            <div className={carProductsStyling['is-2']}></div>
            <div className={carProductsStyling['is-3']}></div>
          </div>
        </div>
      </div>
    </div>

    <MobileCarLoading />
    </>
  );
}

export default CarLoading;
