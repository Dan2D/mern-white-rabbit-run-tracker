
export const   setUnitConv = (settingUnits, dataUnits) => {
    let distConv = 1;
    let timeConv = 1;
    if (settingUnits !== dataUnits) {
      if (settingUnits === "km" && dataUnits === "mi") {
        distConv = 1.60934;
        timeConv = 0.62137;
      }
      if (settingUnits === "mi" && dataUnits === "km"){
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

  export const validateTitle = (title) => {
    if (!(/.{1,30}$/).test(title)){
       return "Title must be between 1 and 30 characters"
    }
    if (!(/^[\w\s#$^+=!*()@%&]{1,30}$/).test(title)){
      return "Title can only contain alphanumeric and special characters (#$^+=!*()@%&)";
    }
    return null;
  }

  export const validatePace = (pace) => {
    if (!(/^[\d]{1,2}:[0-5]{1}[\d]{1}$/g).test(pace)){
      return "Please enter pace in a valid format (mm:ss)"
    }
    return null;
  }

  export const validateDist = (dist) => {
    if (!(/^[\d/.]{1,5}$/).test(dist)){
      console.log(dist, "DIST")
      return "Please enter a valid distance"
    }
    return null;
  }