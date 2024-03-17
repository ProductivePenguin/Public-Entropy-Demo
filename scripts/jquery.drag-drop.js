(function($){
	$.fn.dragDrop = function(configs)
	{
		var settings = $.extend({
			url: null,
			method: 'POST',
			inputName: 'files',
			acceptType: null,
			class : null,
			xcsrftoken: null,
			tokenKey: null,
			label: 'Drag and Drop Images Here',
			uploadedFileUrl: null
		},configs);

		var dragDrop = this;
		

		return this.each(function(){
			childs = $(dragDrop).find('.wrapper');
			if(!childs.length)
			{
				$(this).append('<div class="drag-drop-wrapper">'+
                    '<input type="file">'+
                    '<input type="hidden" name="' + settings.inputName + '">'+
                    '<div class="drop-area">'+
                        '<h3 class="drop-text">' + settings.label + '</h3>'+
                    '</div>'+
                '</div>');
			}

			$(dragDrop).find('.drop-area').on('dragenter',function(e){
				e.preventDefault();
				$(this).css('background', '#BBD5B8');
			});

			$(dragDrop).find('.drop-area').on('dragover',function(e){
				e.preventDefault();
			});

			$(dragDrop).find('.drop-area').on('drop', function(e){
				$(this).css('background', '#FFF');
				e.preventDefault();
				var files = e.originalEvent.dataTransfer.files;
				createFormData(files);
			});

			$(dragDrop).find('.drop-area').on('click', function(){
				$(dragDrop).find('input[type="file"]').click();
			});

			$(dragDrop).find('input[type="file"]').on('change', function(){
				createFormData(this.files);
			});

			$(document).on('click', '.remove-file', function(){
				$(this).parents('.progress-bar-wrapper').remove();
			});


			function createFormData(files)
		    {
			     var fileForm = new FormData();
			     numberOfFiles = files.length;
				 console.log(files[0]);
				 fileForm.append("files", files[0], 'sample_filename')
			    //  name = Date.now();
			    //  for(i=0; i < numberOfFiles; i++)
			    //  {
				// 	console.log(files[i])

			    //  	// fileForm.append('file-'+i, files[i]);

					

			    //  	$(dragDrop).append('<div class = "progress-bar-wrapper"><div class="progress  mt-3 d-inline-block" style = "width:calc(100% - 25px)" name="'+ (name+i) +'">'+
  				// 							'<div class="progress-bar progress-bar-animated" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">0%</div>'+
				// 						'</div><span class="pull-right" style="margin-top: .7rem !important;"><a href="javascript:;" class = "remove-file"><i class="fa fa-times-circle text-danger"></i></a> <input type = "hidden" name = "'+ settings.inputName + '[]" /></span> <span> '+ files[i].name +'</span></div>');
				// }
				fileForm.append('test_append_1', "this is a test!!!");

				uploadFormData(fileForm, 'sample_fname');
			}

			function uploadFormData(formData, fileName) 
		    {

				// -- I've disabled CORS on the backend --
		    	// let ajaxSetup = $.ajaxSetup();
		    	// if(typeof ajaxSetup.headers == 'undefined' || typeof ajaxSetup.headers['X-CSRF-TOKEN'] == 'undefined')
				// {
				// 	if(!settings.xcsrftoken && !$('meta[name="csrf-token"]').attr('content'))
				// 	{
				// 		console.error('X-CSRF-TOKEN has not been set in ajaxSetup. Nor, xcsrftoken provided in initialization nor defined in meta tag. Please initialize csrftoken in <meta name="csrf-token" content="csrf_token_provided_server"/>');
				// 	}
				// 	else
				// 	{
				// 		$.ajaxSetup({
				//             headers: {
				//                 'X-CSRF-TOKEN': ((settings.xcsrftoken) ? settings.xcsrftoken : $('meta[name="csrf-token"]').attr('content'))
				//             }
				//         });
				// 	}
				// }


				// If you want to add an extra field for the FormData
				formData.append("CustomField", "This is some extra data, testing");

				for (var pair of formData.entries()) {
					console.log(pair[0]+ ', ' + pair[1]); 
				}

				$.ajax({
					type: "POST",
					enctype: 'multipart/form-data',
					url: "/upload",
					data: formData,
					processData: false,
					contentType: false,
					cache: false,
					timeout: 600000,
					success: function (data) {
						console.log("SUCCESS : ", data);

					},
					error: function (e) {
						console.log("ERROR : ", e);
					}
				});


		    	// $.ajax({
			    //  	url: settings.url,
				// 	method: 'POST',
			    //  	type: "POST", // For jQuery < 1.9
			    //  	data: formData,
				// 	enctype: "multipart/form-data",
			    //  	cache: false,
			    //  	contentType:false,
			    //  	processData: false,
			    //  	// dataType: 'json',
					
			    //  	// for progess bar in upload
			    //  	xhr: function() {
			    //  		var myXhr = $.ajaxSettings.xhr();
		        //         if(myXhr.upload){
		        //             myXhr.upload.addEventListener('progress',function(e){
		        //             	if(e.lengthComputable){
				// 			        var max = e.total;
				// 			        var current = e.loaded;
				// 			        var Percentage = (current * 100)/max;
				// 			        bar = $('div.progress[name="'+fileName+'"]').find('.progress-bar');
				// 			        $(bar).css('width',Percentage+'%');
				// 			        $(bar).text(Percentage+'%');
				// 			        if(Percentage >= 100)
				// 			        {
							        	
							        	
				// 			        }
				// 			    }  
		        //             }, false);
		        //         }
			    //         return myXhr;
			    //     },
			    //     success: function(data){
				// 		console.log(data);
			    //     	keypattern = (settings.uploadedFileUrl) ? settings.uploadedFileUrl : 'value';

			    //     	$('div[name="'+fileName+'"]').parents('.progress-bar-wrapper').find('input').val(objectMap(data,keypattern));
				//     }
				// });
		    }

		    function objectMap(object,keypattern = null)
			{
				keypattern = keypattern.toString();
				var returnableValue = object;
				keys = keypattern.split('.');
				keys.forEach(function(key){
					if(returnableValue)
					{
						returnableValue = returnableValue[key];
					}	
				});
				return (returnableValue != null)? returnableValue : '';
			}
		});
	}

}(jQuery));