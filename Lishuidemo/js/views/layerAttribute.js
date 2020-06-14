define(['./Container','spectrum','drag','slider'],function(Container,spectrum,drag,slider){
    "use strict";
    var _ = require('underscore');
    var $ = require('jquery');
    var htmlStr = [
        '<main class="mainView" id="layerForm" style="display: none;">',
        /*'<label style="text-align: left;margin-bottom: 10px;margin-top: -10px;font-size: 13px;color: lightgrey;">'+ Resource.layerOptions +'</label>',*/
        '<button aria-label="Close" id="layerClose" class="myModal-close"><span aria-hidden="true">&times;</span></button>',

        '<input id="layer-attribute-basic" type="radio" name="layer-attribute-tab" checked/>',
        '<label for="layer-attribute-basic" class="function-module-caption">' + Resource.basicOptions + '</label>',
        '<input id="layer-attribute-style" type="radio" name="layer-attribute-tab"/>',
        '<label for="layer-attribute-style" class="function-module-caption">' + Resource.styleSetting + '</label>',
        '<input id="layer-attribute-operation" type="radio" name="layer-attribute-tab"/>',
        '<label for="layer-attribute-operation" class="function-module-caption">' + Resource.LayerOperation + '</label>',

        '<section id="layer-attribute-basic-content">',
            '<div class="function-module-content">',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+ Resource.layerName +'</label>',
                    '<input id="layerName" class="input disabled width-adjust" type="text" disabled/>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+ Resource.shadow +'</label>',
                        '<div style="overflow: auto;">',
                            '<div class="half">',
                                '<label class="function-module-sub-section-caption-indent">'+ Resource.shadowMode +'</label>',
                                '<select id="shadowType" class="input" class="selectpicker show-tick form-control">',
                                    '<option value="noShadow" selected>'+ Resource.noShadow +'</option>',
                                    '<option value="chooseShadow">'+ Resource.setSelectionShadow +'</option>',
                                    '<option value="allShadow" >'+ Resource.setShadow +'</option>',
                                '</select>',
                            '</div>',
                            '<div class="half">',
                                '<label class="function-module-sub-section-caption-indent">'+ Resource.shadowDarkness +'</label>',
                                '<input type="range" id="darkness" min="0.1" max="0.9" step="0.1" value="0.3" style="width: 90%;">',
                            '</div>',
                    '</div>',
                '</div>',
                '<div>',
                    '<label class="function-module-sub-section-caption">'+ Resource.visibility +'</label>',
                    '<div class="function-module-sub-indent-section" style="overflow: hidden;">',
                        '<div id="choosenDisplay">',
                            '<label class="function-module-sub-section-caption-indent">',
                                '<input type="radio" name="choosenDisHidd">',
                                '<span>'+ Resource.onlyShowSlection +'</span>',
                            '</label>',
                        '</div>',
                        '<div id="chooseHidden">',
                            '<label class="function-module-sub-section-caption-indent">',
                                '<input type="radio" name="choosenDisHidd">',
                                '<span>'+ Resource.onlyHideSlection +'</span>',
                            '</label>',
                        '</div>',
                        '<div id="initialize">',
                            '<label class="param-item-first-level">',
                                '<input type="radio" name="choosenDisHidd" checked>',
                                '<span>'+ Resource.showAll +'</span>',
                            '</label>',
                        '</div>',
                    '</div>',
                    '<div class="function-module-sub-indent-section param-item-first-level">',
                        '<label class="half">',
                            '<input type="checkbox" id="display" checked/>',
                            '<span>'+ Resource.display +'</span>',
                        '</label>',
                        '<label class="half">',
                            '<input type="checkbox" id="multiChoose"/>',
                            '<span>'+ Resource.multiSelection +'</span>',
                        '</label>',
                    '</div>',
                    '<div class="function-module-sub-indent-section param-item-first-level">',
                        '<label class="half">',
                            '<input type="checkbox" id="cullEnabled"/>',
                            '<span>'+ Resource.cullEnabled +'</span>',
                        '</label>',
                        '<label class="half">',
                            '<input type="checkbox" id="breleaseColor" checked/>',
                            '<span>'+ Resource.bReleaseColor +'</span>',
                        '</label>',
                    '</div>',
                    '<div class="function-module-sub-indent-section param-item-first-level">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption">'+ Resource.visibleDistanceMin + '' + '</label>',
                            '<input type="number" class="input" id="min-visible-height">',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption">'+ Resource.visibleDistanceMax +'</label>',
                            '<input type="number" class="input" id="max-visible-height">',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</section>',

        '<section id="layer-attribute-style-content">',
            '<div class="function-module-content">',
                '<div class="function-module-sub-section">',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">'+ Resource.foreColor +'</label>',
                        '<input class="colorPicker" id="foreColorPicker">',
                    '</div>',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">'+ Resource.lineColor +'</label>',
                        '<input class="colorPicker" id="lineColorPicker">',
                    '</div>',
                '</div>',

                '<div class="function-module-sub-section">',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">'+ Resource.bottomAltitude +'</label>',
                        '<input type="number" class="input" id="bottomAltitude" value="0">',
                    '</div>',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">LOD</label>',
                        '<input type="range" min="0.1" max="10" step="0.5" id="LODScale" style="width: 90%;"/>',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">'+ Resource.fillStyle +'</label>',
                        '<select id="fillStyle" class="input">',
                            '<option value="fill" selected>'+ Resource.fillMode +'</option>',
                            '<option value="wireframe">'+ Resource.lineMode +'</option>',
                            '<option value="fill-and-wireframe">'+ Resource.fillAndLine +'</option>',
                        '</select>',
                    '</div>',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">' + Resource.lineMode + '</label>',
                        '<select id="wireframe-mode" class="input">',
                            '<option value="triangle" selected>'+ Resource.TriangleWireframeMode +'</option>',
                            '<option value="quad">'+ Resource.QuadWireframeMode +'</option>',
                            '<option value="sketch" >'+ Resource.SketchWireframeMode +'</option>',
                        '</select>',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<div class="half">',
                        '<label class="function-module-sub-section-caption">'+ Resource.modelTransparency +'</label>',
                        '<input type="number" class="input" id="modelAlpha" min="0" max="1.0" step="0.01" value="1.0"/>',
                    '</div>',
                '</div>',
                '<div>',
                    '<label class="function-module-sub-section-caption">' + Resource.selectEffect + '</label>',
                    '<div style="overflow: auto;">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">'+ Resource.selectColorType +'</label>',
                            '<select id="colorStyle" class="input" class="selectpicker show-tick form-control" style="height: 30px;">',
                                '<option value="0" selected>'+ Resource.mix +'</option>',
                                '<option value="1">'+ Resource.replace +'</option>',
                            '</select>',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">'+ Resource.selectColor +'</label>',
                            '<input class="colorPicker" readonly="readonly" id="selectColorPicker">',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</section>',

        '<section id="layer-attribute-operation-content">',
            '<div class="function-module-content">',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+ Resource.ObliquePhotographyExcavation +'</label>',
                    '<div style="overflow: auto;">',
                        '<button type="button" class="btn btn-info function-module-btn" id="delExcavationRegion" style="margin-top: 10px;">' + Resource.ClearExcavation + '</button>',
                        '<button type="button" class="btn btn-info function-module-btn function-module-btn-highlight" style="margin-top: 10px;" id="excavationRegion">' + Resource.ExecuteExcavation + '</button>',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+ Resource.ObliquePhotographyFlatten +'</label>',
                    '<div style="overflow: auto;">',
                        '<button type="button" class="btn btn-info function-module-btn" style="margin-top: 10px;" id="delFlattenRegion">' + Resource.ClearFlatten + '</button>',
                        '<button type="button" class="btn btn-info function-module-btn function-module-btn-highlight" style="margin-top: 10px;" id="flattenRegion">' + Resource.ModelFlatten + '</button>',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+Resource.FloodAnalysis+'</label>',
                    '<div class="function-module-sub-indent-section">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">' + Resource.MaxHeight + '</label>',
                            '<input type="number" class="input" id="flood-max-height" value="71" required="required"/>',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">' + Resource.MinHeight + '</label>',
                            '<input type="number" class="input" id="flood-min-height" value="1" required="required"/>',
                        '</div>',
                    '</div>',
                    '<div class="function-module-sub-indent-section">',
                        '<label class="function-module-sub-section-caption-indent">' + Resource.FloodSpeed + '</label>',
                        '<input type="number" class="input" id="flood-speed" value="1" required="required" style="width:95%;"/>',
                    '</div>',
                    '<div style="overflow: auto;">',
                        '<button type="button" class="btn btn-info function-module-btn" style="margin-top: 10px;" id="clear-flood">' + Resource.ClearFlood + '</button>',
                        '<button type="button" class="btn btn-info function-module-btn function-module-btn-highlight" style="margin-top: 10px;" id="execute-flood">' + Resource.ExecuteFlood + '</button>',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+Resource.SelectOffset+'</label>',
                    '<div class="function-module-sub-indent-section">',
                        '<label for="choose-offset" class="function-module-sub-section-caption-indent">',
                            '<input type="checkbox" id="choose-offset"/>',
                            '<span>'+ Resource.OpenSelectOffset +'</span>',
                        '</label>',
                    '</div>',
                    '<div class="function-module-sub-indent-section">',
                        '<label class="function-module-sub-section-caption-indent">'+Resource.OffsetX+':</label>',
                        '<input type="number" class="input" id="choose-x-offset" min="-50" max="50" step="1" value="0">',
                    '</div>',
                    '<div class="function-module-sub-indent-section">',
                        '<label class="function-module-sub-section-caption-indent">'+Resource.OffsetY+':</label>',
                        '<input type="number" class="input" id="choose-y-offset" min="-50" max="50" step="1" value="0">',
                    '</div>',
                    '<div class="function-module-sub-indent-section">',
                        '<label class="function-module-sub-section-caption-indent">'+Resource.offsetZ+':</label>',
                        '<input type="number" class="input" id="choose-z-offset" min="-50" max="50" step="1" value="0">',
                    '</div>',
                '</div>',
                '<div class="function-module-sub-section">',
                    '<label class="function-module-sub-section-caption">'+Resource.LayerColor+'</label>',
                    '<div class="function-module-sub-indent-section">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">' + Resource.brightness + '</label>',
                            '<input type="number" class="input" id="layer-brightness" min="0" max="3" step="0.1">',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">' + Resource.contrast + '</label>',
                            '<input type="number" class="input" id="layer-contrast" min="0" max="5" step="0.1">',
                        '</div>',
                    '</div>',
                    '<div class="function-module-sub-indent-section">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">' + Resource.hue + '</label>',
                            '<input type="number" class="input" id="layer-hue" min="0" max="5" step="0.1">',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">'+ Resource.saturation + '</label>',
                            '<input type="number" class="input" id="layer-saturation" min="0" max="50" step="1">',
                        '</div>',
                    '</div>',
                '</div>',
                '<div>',
                    '<label class="function-module-sub-section-caption">'+Resource.PolygonOffset+'</label>',
                    '<div class="function-module-sub-indent-section">',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">'+Resource.PolygonOffsetFactor+'</label>',
                            '<input type="number" class="input" id="layer-polygon-factor" min="-100" max="100" step="1" value="0">',
                        '</div>',
                        '<div class="half">',
                            '<label class="function-module-sub-section-caption-indent">'+Resource.PolygonOffsetUnit+'</label>',
                            '<input type="number" class="input" id="layer-polygon-unit" min="-100" max="100" step="1" value="0">',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
        '</section>',

        '</main>',
    ].join('');
    var layerAttribute = Container.extend({
        tagName: 'div',
        id: 'layerAttribute',
        template: _.template(htmlStr),
        initialize : function(options){
            this.viewer = options.sceneModel.viewer;
            this.render();
            this.on('componentAdded',function(parent){
				$(document).ready(function() {
					var widget = $('#layerForm');
					var tabs = widget.find('ul a'),
						content = widget.find('.tabs-content-placeholder > div');
					tabs.on('click', function (e) {
						e.preventDefault();
						// Get the data-index attribute, and show the matching content div
						var index = $(this).data('index');
						tabs.removeClass('tab-active');
						content.removeClass('tab-content-active');
						$(this).addClass('tab-active');
						content.eq(index).addClass('tab-content-active');
					});
                });
                var shadowMap = this.viewer.shadowMap;
                shadowMap.darkness = 0.3;
                shadowMap.size = 2048;
                shadowMap.softShadows = false;
                var shadowDarkness = document.getElementById("darkness");
                shadowDarkness.oninput = function(){
                    var darkness = shadowDarkness.value;
                    shadowMap.darkness = darkness;
                };
                $('#layerForm').myDrag({
                    parent:'body', //定义拖动不能超出的外框,拖动范围
                    randomPosition:false, //初始化随机位置
                    direction:'all', //方向
                    handler:false, //把手
                    dragStart:function(x,y){}, //拖动开始 x,y为当前坐标
                    dragEnd:function(x,y){}, //拖动停止 x,y为当前坐标
                    dragMove:function(x,y){} //拖动进行中 x,y为当前坐标
                });
                $("#lineColorPicker").spectrum({
                    change:function(){
                        $('#lineColorPicker').trigger('input');
                    },
                    color: "#fff",
                    showPalette: true,
                    showAlpha: true,
                    localStorageKey: "spectrum.demo",
                    palette: palette
                });
                $("#selectColorPicker").spectrum({
                    change:function(){
                        $('#selectColorPicker').trigger('input');
                    },
                    color: "rgba(178.5, 178.5, 255, 1)",
                    showPalette: true,
                    showAlpha: true,
                    localStorageKey: "spectrum.demo",
                    palette: palette
                });
                $("#choose-offset-color").spectrum({
                    change:function(){
                        $('#choose-offset-color').trigger('input');
                    },
                    color: "#fff",
                    showPalette: true,
                    showAlpha: true,
                    localStorageKey: "spectrum.demo",
                    palette: palette
                });
            });
        },
        render : function(){
            this.$el.html(this.template());
            return this;
        }
    });
    return layerAttribute;
});
