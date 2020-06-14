     function onload(Cesium) {
        //var viewer = new Cesium.Viewer('cesiumContainer');
//        viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
//            url: 'https://dev.virtualearth.net',
//            mapStyle: Cesium.BingMapsStyle.AERIAL,
//            key: URL_CONFIG.BING_MAP_KEY
//        }));
        var scene = viewer.scene;
        
        $(".form-group").show();
        $(".element").show();
        var widget = viewer.cesiumWidget;
        try {
            //���S3Mͼ�����
            //var promise = scene.open('http://www.supermapol.com/realspace/services/3D-yanmofenxi/rest/realspace');
            var promise = scene.open('http://localhost:8091/iserver/services/3D-square/rest/realspace');
            Cesium.when(promise, function (layers) {
                // ��������ӽǣ����ڲ鿴ģ��
                // scene.camera.setView({
                //     destination : new Cesium.Cartesian3.fromDegrees(114.2158,22.4169,419),
                //     orientation : {
                //         up : new Cesium.Cartesian3(-0.1629169048778112, 0.7143202157541026, 0.6805914424014209),
                //         direction : new Cesium.Cartesian3(0.5945902470233576, -0.4793925407032518, 0.6454806194323606),
                //         heading : 5.899584294129949
                //     }
                // });
                scene.camera.setView({
                    //���Ŀ��λ��
                    //destination: new Cesium.Cartesian3.fromDegrees(119.9223338399999900, 28.4621521800000000, 1323.445971240632),			

                    //�����λ��
                    orientation: {
                        heading: 3.1612,
                        pitch: -1.5188,
                        roll: 6.283185307179563
                    }
                });

            }, function (e) {
                if (widget._showRenderLoopErrors) {
                    var title = '��Ⱦʱ����������ֹͣ��Ⱦ��';
                    widget.showErrorPanel(title, undefined, e);
                }
            });
        } catch (e) {
            if (widget._showRenderLoopErrors) {
                var title = '��Ⱦʱ����������ֹͣ��Ⱦ��';
                widget.showErrorPanel(title, undefined, e);
            }
        }

        //�������ʼ����ť����ʼ��û����
			$("#begin").click(function() {
				 currentHeight = 0;
            int = self.setInterval("flood()", 100);
            maxValue = parseInt(document.getElementById("maxHeight").value);
            minValue = parseInt(document.getElementById("minHeight").value);
			})

        window.flood = function() {
            if(currentHeight > maxValue) {
                self.clearInterval(int);
                return;
            }

            var layer = scene.layers.find("square");
           // var layer = scene.layers.find("sci_park");
            var hyp = new Cesium.HypsometricSetting();

            //�����ֲ���ɫ����   �������/��С�ɼ��߶�   ��ɫ��  ��ʾģʽ   ͸���ȼ��߿�
            var colorTable = new Cesium.ColorTable();

            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;

            var value = $("#colorTable").find("option:selected")[0].value;
            setColorTable(colorTable, value);

            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.5;

            hyp.LineInterval = 10.0;

            //����ͼ��ֲ���ɫ����
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            };

            currentHeight += (parseInt(document.getElementById("speed").value))/10;
        };

        //����������
		$("#remove").click(function() {
			self.clearInterval(int);
//            var layer = scene.layers.find("sci_park");
            var layer = scene.layers.find("square");
            var hyp = new Cesium.HypsometricSetting();
            hyp.MaxVisibleValue = 0;

            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
		})

       function setColorTable(colorTable, key) {
            switch (key) {
                case "1":
                    colorTable.insert(162, new Cesium.Color(0, 39/255, 148/255));
                    colorTable.insert(37, new Cesium.Color(149/255, 232/255, 249/255));
                    break;
                case "2":
                    colorTable.insert(162, new Cesium.Color(162/255, 251/255, 194/255));
                    colorTable.insert(37, new Cesium.Color(1, 103/255, 103/255));
                    break;
                case "3":
                    colorTable.insert(162, new Cesium.Color(230/255, 198/255, 1));
                    colorTable.insert(37, new Cesium.Color(157/255, 0, 1));
                    break;
                case "4":
                    colorTable.insert(162, new Cesium.Color(210/255, 15/255, 15/255));
                    colorTable.insert(130, new Cesium.Color(221/255, 224/255, 7/255));
                    colorTable.insert(99, new Cesium.Color(20/255, 187/255, 18/255));
                    colorTable.insert(68, new Cesium.Color(0, 161/255, 1));
                    colorTable.insert(37, new Cesium.Color(9/255, 9/255, 212/255));
                    break;
                case "5":
                    colorTable.insert(162, new Cesium.Color(186/255, 1, 229/255));
                    colorTable.insert(37, new Cesium.Color(26/255, 185/255, 156/255));
                    break;
                default:
                    break;
            }
        }


        $('#colorTable').change(function () {
            var layer = scene.layers.find('square');
            var value = $(this).find("option:selected")[0].value;

            var hyp = new Cesium.HypsometricSetting();

            //�����ֲ���ɫ����   �������/��С�ɼ��߶�   ��ɫ��  ��ʾģʽ   ͸���ȼ��߿�
            var colorTable = new Cesium.ColorTable();

            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;

            var value = $("#colorTable").find("option:selected")[0].value;
            setColorTable(colorTable, value);

            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.5;

            hyp.LineInterval = 10.0;

            //����ͼ��ֲ���ɫ����
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        });

 }



    