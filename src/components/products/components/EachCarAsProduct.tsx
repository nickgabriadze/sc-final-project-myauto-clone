import carProductsStyling from "../carProducts.module.css";
import { Product } from "../productsInterfaces";
import GreenCheckSVG from "../icons/greenCheck.svg";
import { useEffect, useState } from "react";
import { Manufacturer, Model } from "../../search/searchInterfaces";
import GearBoxSVG from "../icons/gearbox.svg";
import EngineSVG from "../icons/engine.svg";
import OdometerSVG from "../icons/odometer.svg";
import SteeringWheel from "../icons/steeringWheel.svg"



function EachCarAsProduct({ carAsProduct }: { carAsProduct: Product }) {
  const [modelName, setModelName] = useState<string>();

  const eachEngineVolume = carAsProduct.engine_volume.toString().slice(0, 2).split("").join(".")

  useEffect(() => {
    const abortController = new AbortController();

    const fetchModels = async () => {
      const request = await fetch(
        `https://api2.myauto.ge/ka/getManModels?man_id=${carAsProduct.man_id}`
      );
      const manModels = request.json();

      return manModels;
    };

    const fetchMans = async () => {
      const request = await fetch(`https://static.my.ge/myauto/js/mans.json`);
      const mans = request.json();

      return mans;
    };

    try {
      const innerFunc = async () => {
        const fetchedModels = await fetchModels();
        const mans = await fetchMans();

        const model = fetchedModels.data.filter(
          (eachModel: Model) => eachModel.model_id === carAsProduct.model_id
        )[0].model_name;

        const man = mans.filter(
          (eachMan: Manufacturer) =>
            Number(eachMan.man_id) === carAsProduct.man_id
        )[0].man_name;

       
        setModelName(man.concat(" ").concat(model));
      };
      innerFunc();
    } catch (err) {
      console.log(err);
    }

    return () => abortController.abort();
  }, [carAsProduct.man_id, carAsProduct.model_id]);


  return (
    <div className={carProductsStyling["car-wrapper"]}>
      <div className={carProductsStyling["car-visual-picture"]}>
        <img
          src={`https://static.my.ge/myauto/photos/${carAsProduct.photo}/thumbs/${carAsProduct.car_id}_1.jpg?v=${carAsProduct.photo_ver}`}
          width={182}
          height={144}
          draggable={false}
        ></img>
      </div>

      <div className={carProductsStyling["car-info"]}>
        <div className={carProductsStyling["model-year-customs-location"]}>
          <div className={carProductsStyling["model-year"]}>
            <p
              style={{ color: "black", fontWeight: "bold", maxWidth: "250px" }}
            >
              {modelName}
            </p>
            <p style={{ color: "#8C929B", fontWeight: "bold" }}>
              {carAsProduct.prod_year} წ
            </p>
          </div>

          <div className={carProductsStyling["customs-location"]}>
            {carAsProduct.customs_passed ? (
              <>
                <img src={GreenCheckSVG}></img>
                <p style={{ color: "#26B753" }}>განბაჟებული</p>
              </>
            ) : (
              <p style={{ color: "#FF3B30" }}>განუბაჟებელი</p>
            )}
            <p>ლოკაცია</p>
          </div>
        </div>
        <div className={carProductsStyling['hardware-price']}>
              <div className={carProductsStyling['engine-gearbox']}>
                <div>
                  <img src={EngineSVG}></img>
                  <p>{eachEngineVolume}</p>
                </div>

                <div>
                  <img src={GearBoxSVG}></img>
                  <p>{carAsProduct.gear_type_id}</p>
                </div>
              </div>

              <div className={carProductsStyling['odometer-sWheel']}>
              <div>
                  <img src={OdometerSVG}></img>
                  <p>{carAsProduct.car_run_km} კმ</p>
                </div>

                <div>
                  <img src={SteeringWheel}></img>
                  <p>{carAsProduct.right_wheel ? "მარჯვენა" : "მარცხენა"}</p>
                </div>
              </div>


              <div>

              </div>
        </div>
      </div>
    </div>
  );
}

export default EachCarAsProduct;
