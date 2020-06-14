/**
 * 提供加载高德地图瓦片方法
 * 
 * @param {*} Cesium 
 * @param {*} options 
 */
function GaodeMapsImageryProvider(Cesium, options) {

    options = Cesium.defaultValue(options, {});

   
    // L3~L18 高德地图矢量  L18以后瓦片为白色图片 矢量地图+边界路网+标签
    var vecURL = 'https://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
    // 高德地图卫星（无道路无标签）
    var satelliteURL = 'https://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6'
    // 矢量地图+边界路网（无标签）
    var vecNoLabel = 'http://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7';
    // 边界路网（有标签）
    var roadLabelURL = 'https://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&style=8'
    //  边界路网（无标签）
    var roadNoLabel = 'https://wprd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8';


    // 用户传入的地图类型，可选vec,sat,roadLabel,vecNoLabel,roadNolabel
    var mapType = options.mapType;

    switch (mapType) {
        case "vec":
            // 加载矢量地图
            mapType = vecURL;
            break;
        case "sat":
            // 加载卫星地图
            mapType = satelliteURL;
            break;
        case "roadLabel":
            // 加载道路及标签
            mapType = roadLabelURL;
            break;
        case "vecNoLabel":
            // 矢量地图有道路边界无标签
            mapType = vecNoLabel;
            break;
        case "roadNoLabel":
            // 道路无标签
            mapType = roadNoLabel;
            break;
        default:
            mapType = roadURL;
            break;
    }

    this._mapType = mapType;

    var defaultCredit = new Cesium.Credit('© <a href="https://gaode.com">高德地图</a>');


    var tilingScheme = new Cesium.WebMercatorTilingScheme({
        ellipsoid: options.ellipsoid
    });

    var tileWidth = 256;
    var tileHeight = 256;

    // L1~L2高德瓦片为白色图片
    var minimumLevel = Cesium.defaultValue(options.minimumLevel, 3);
    // L18以后高德瓦片为白色图片
    var maximumLevel = Cesium.defaultValue(options.maximumLevel, 18);

    var rectangle = Cesium.defaultValue(options.rectangle, tilingScheme.rectangle);


    var credit = Cesium.defaultValue(options.credit, defaultCredit);
    if (typeof credit === 'string') {
        credit = new Cesium.Credit(credit);
    }

    return new Cesium.UrlTemplateImageryProvider({
        url: mapType,
        credit: credit,
        subdomains: '1234',
        tilingScheme: tilingScheme,
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        minimumLevel: minimumLevel,
        maximumLevel: maximumLevel,
        rectangle: rectangle
    });
}