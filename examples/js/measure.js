(function measure() {
    // Main control bar
		var mainbar = new ol.control.Bar();
		map.addControl(mainbar);

		// Edit control bar 
		var editbar = new ol.control.Bar(
			{	toggleOne: true,	// one control active at the same time
				group:false			// group controls together
			});
		mainbar.addControl(editbar);

		// Add selection tool:
		//  1- a toggle control with a select interaction
		//  2- an option bar to delete / get information on the selected feature
		var sbar = new ol.control.Bar();
		editbar.addControl (new ol.control.Button(
				{	html: '<i class="fa fa-times"></i>',
					title: "删除",
					handleClick: function() 
					{	var features = selectCtrl.getInteraction().getFeatures();
						if (!features.getLength()) info("Select an object first...");
						else info(features.getLength()+" object(s) deleted.");
						for (var i=0, f; f=features.item(i); i++) 
						{	vector.getSource().removeFeature(f);
						}
						selectCtrl.getInteraction().getFeatures().clear();
					}
                }));


		var selectCtrl = new ol.control.Toggle(
				{	html: '<i class="fa fa-hand-pointer-o"></i>',
					//title: "Select",
					title: '选择',
					interaction: new ol.interaction.Select (),
					//bar: sbar,
					autoActivate:true,
					active:false
				});

		editbar.addControl ( selectCtrl);

		/*
        // Add editing tools
		var pedit = new ol.control.Toggle(
				{	html: '<i class="fa fa-map-marker" ></i>',
					title: 'Point',
					interaction: new ol.interaction.Draw
					({	type: 'Point',
						source: vector.getSource()
					})
				});
		editbar.addControl ( pedit );
        

		var ledit = new ol.control.Toggle(
				{	html: '<i class="fa fa-share-alt" ></i>',
					//title: 'LineString',
					title: '线段',
					interaction: new ol.interaction.Draw
					({	type: 'LineString',
						source: vector.getSource(),
						// Count inserted points
						geometryFunction: function(coordinates, geometry) 
						{   if (geometry) geometry.setCoordinates(coordinates);
							else geometry = new ol.geom.LineString(coordinates);
							this.nbpts = geometry.getCoordinates().length;
							return geometry;
						}
                    }),
				});

		editbar.addControl ( ledit );
        */

		var fedit = new ol.control.Toggle(
				{	html: '<i class="fa fa-bookmark-o fa-rotate-270" ></i>',
					//title: 'Polygon',
                    title: '多边形',
                    interaction: draw,
                    /*
					interaction: new ol.interaction.Draw
					({	type: 'Polygon',
						source: vector.getSource(),
						style: new ol.style.Style({
                            
							fill: new ol.style.Fill({
                                //color:'rgba(255,255,255,0.2)'
                                color:'	#fff'
                            }),
							
                            stroke: new ol.style.Stroke({
                                //color: 'rgba(0,0,0,0.5)',
                                color:'#B23AEE',
                                //linedash,定义了Line dash pattern，虚线
                                lineDash: [10, 10],
                                width:2
                            }),
                            image: new ol.style.Circle({
                                //鼠标点图标半径
                                radius: 5,
                                stroke: new ol.style.Stroke({
                                    //color:'rgba(0,0,0,0.7)'
                                    color:'#1C86EE'
                                }),
                                fill: new ol.style.Fill({
                                    //color: 'rgba(255,255,255,0.2)'
                                    color:'#00EE00'
                                })
                            })
                        }),
						// Count inserted points
						geometryFunction: function(coordinates, geometry) 
						{   this.nbpts = coordinates[0].length;
							if (geometry) geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])]);
							else geometry = new ol.geom.Polygon(coordinates);
							return geometry;
						}
                    }),
                    */
					
					// Options bar ssociated with the control
					bar: new ol.control.Bar(
						{	controls:[ new ol.control.TextButton(
								{	html: 'undo',//'<i class="fa fa-mail-reply"></i>',
									title: "undo last point",
									handleClick: function() 
									{	if (fedit.getInteraction().nbpts>1) fedit.getInteraction().removeLastPoint();
									}
								}),
								new ol.control.TextButton(
								{	html: 'finish',
									title: "finish",
									handleClick: function() 
									{	// Prevent null objects on finishDrawing
										if (fedit.getInteraction().nbpts>3) fedit.getInteraction().finishDrawing();
									}
								})
							]
						})
					
				});
        editbar.addControl ( fedit );
    // Show info
		function info(i)
		{	$("#info").html(i||"");
        }
})();