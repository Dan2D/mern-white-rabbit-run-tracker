
export const   setUnitConv = (settingsUnits, dataUnits) => {
    let distConv = 1;
    let timeConv = 1;
    if (settingsUnits !== dataUnits) {
      // Going from mi to km
      if (dataUnits === "mi") {
        distConv = 1.60934;
        timeConv = 0.62137;
        // From km to mi
      } else {
        distConv = 0.62137;
        timeConv = 1.60934;
      }
      return {timeConv, distConv};
    }
    return {timeConv, distConv};
  }


export const paceConvert = (targetPace, timeFactor) => {
    if (typeof targetPace === "string"){
    let paceStr = targetPace.split(":");
    targetPace = (parseInt(paceStr[0])*60 + parseInt(paceStr[1]))*timeFactor;
    paceStr[0] = Math.floor(targetPace/60).toString();
    paceStr[1] = Math.round(targetPace % 60).toString().padStart(2,0);
    return paceStr.join(":");
}
return targetPace;
  }