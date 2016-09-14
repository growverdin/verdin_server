function myGarden_login() {
	alert("We are working hard to bring VerdIN to your garden as soon as possible! :)");
}

function size() {
	//GETS SIZE OF THE WINDOW
	var w_width = window.innerWidth;
	var w_height = window.innerHeight;

	//POSITION THE LOADING DIV AND MAKE VISIBLE
	var loading_width = document.getElementById("loading").clientWidth;
	var loading_height = document.getElementById("loading").clientHeight;
	var loading_left = (w_width - loading_width)/2;
	var loading_top = (w_height - loading_height)/2;
	document.getElementById("loading").style.left = loading_left + "px";
	document.getElementById("loading").style.top = loading_top + "px";
	document.getElementById("loading").style.visibility = "visible";

	//SET BODY SIZE EQUAL TO WINDOW SIZE
	var body_width = w_width;
	var body_height = w_height;
	document.body.style.width = body_width + "px";
	document.body.style.height = body_height + "px";
	
	//BACKGROUND
	//just commented to use @media queries for the assignment
	/*if (body_width <= body_height) {
		document.getElementById("body").style.backgroundImage = "url('imgs/background_flowers_portrait.jpg')";
	} else {
		document.getElementById("body").style.backgroundImage = "url('imgs/background_flowers_landscape.jpg')";
	}*/
	document.getElementById("body").style.backgroundSize = body_width + "px " + body_height + "px";

	//MOBILE FLAG
	var mobile = false;

	//CURRENT PAGE
	var page = location.href.split("/").slice(-1);

	//CONTENT DIV
	//SET SOME DEFAULT VALUES
	document.getElementById("header_logo").style.width = parseFloat(window.getComputedStyle(document.getElementById("header_logo"), null).maxWidth) + "px";
	document.getElementById("header_logo_text").style.fontSize = "24px";

	var header_left_width = document.getElementById("header_left").clientWidth;
	var header_left_text_width = document.getElementById("header_left_text").clientWidth;
	var header_right_width = document.getElementById("header_right").clientWidth;

	var content_width = body_width*(7/10);
	//if (header_left_width + header_left_text_width + 50 + header_right_width > content_width) {
	if (1112 > w_width) {
		content_width = body_width*(95/100);
		//if (header_left_width + header_left_text_width + 50 + header_right_width > content_width) {
		if (820 > w_width) {
			//SET TO MOBILE VERSION
			mobile = true;
		}
	}
	var content_height = body_height;
	document.getElementById("content").style.width = content_width + "px";
	document.getElementById("content").style.height = content_height + "px";
	var content_padding = (body_width - content_width)/2;

	//HEADER
	if (page == "improving.html") {
		document.getElementById("mygarden_arrow").style.visibility = "visible";
	} else {
		document.getElementById("mygarden_arrow").style.visibility = "hidden";
	}
	if (mobile) {
		//SET THE MOBILE VALUES
		var header_logo_height = document.getElementById("header_logo").clientHeight;
		var header_right_height = document.getElementById("header_right").clientHeight;
		var header_logo_width = document.getElementById("header_logo").clientWidth*(header_right_height/header_logo_height);
		document.getElementById("header_logo").style.width = header_logo_width + "px";
		document.getElementById("header_logo_text").style.fontSize = "20px";
		//UPDATE THE SIZES OF HEADER_LEFT
		var header_left_width = document.getElementById("header_left").clientWidth;
		var header_left_text_width = document.getElementById("header_left_text").clientWidth;
		var header_left_text_height = document.getElementById("header_left_text").clientHeight;
		//POSITION THE HEADER
		document.getElementById("header").style.width = content_width + "px";
		document.getElementById("header_content").style.width = content_width + "px";
		var header_left_height = document.getElementById("header_left").clientHeight;
		var header_top_padding1_height = document.getElementById("header_top_padding1").clientHeight;
		var header_top_padding2_height = document.getElementById("header_top_padding2").clientHeight;
		//SEE IF THE LOGO_TEXT FITS IN THE HEADER
		if (content_width < header_left_width + header_left_text_width + 50 + header_right_width) {
			document.getElementById("header_left_text").style.left = content_padding + (content_width - header_left_text_width)/2 + "px";
			document.getElementById("header_left_text").style.top = header_top_padding1_height + header_left_height + "px";
			document.getElementById("header_content").style.height = header_left_height + header_left_text_height + "px";
			var header_content_height = document.getElementById("header_content").clientHeight;
			var header_height = header_left_height + header_left_text_height + header_top_padding1_height + header_top_padding2_height;
		} else {
			document.getElementById("header_left_text").style.left = content_padding + header_left_width + "px";
			document.getElementById("header_left_text").style.top = header_top_padding1_height + ((header_left_height - header_left_text_height)/2) + "px";
			document.getElementById("header_content").style.height = header_left_height + "px";
			var header_content_height = document.getElementById("header_content").clientHeight;
			var header_height = header_left_height + header_top_padding1_height + header_top_padding2_height;
		}
		document.getElementById("header_left").style.left = content_padding + "px";
		document.getElementById("header_left").style.top = header_top_padding1_height + "px";
		document.getElementById("header_right").style.right = content_padding + "px";
		//var header_right_height = document.getElementById("header_right").clientHeight;
		document.getElementById("header_right").style.top = (header_left_height - header_right_height)/2 + header_top_padding1_height + "px";
		//DISABLE THE ARROW
		document.getElementById("mygarden_arrow").style.display = "none";
		document.getElementById("header_content").style.paddingBottom = "0px";
	} else {
		//SET THE DEFAULT VALUES
		document.getElementById("header_logo").style.width = parseFloat(window.getComputedStyle(document.getElementById("header_logo"), null).maxWidth) + "px";
		document.getElementById("header_logo_text").style.fontSize = "24px";
		//POSITION THE HEADER
		document.getElementById("header").style.width = content_width + "px";
		document.getElementById("header_content").style.width = content_width + "px";
		var header_left_height = document.getElementById("header_left").clientHeight;
		var header_top_padding1_height = document.getElementById("header_top_padding1").clientHeight;
		var header_top_padding2_height = document.getElementById("header_top_padding2").clientHeight;
		document.getElementById("header_content").style.height = header_left_height + "px";
		var header_content_height = document.getElementById("header_content").clientHeight;
		var header_height = header_left_height + header_top_padding1_height + header_top_padding2_height;
		document.getElementById("header_left").style.left = content_padding + "px";
		document.getElementById("header_left").style.top = header_top_padding1_height + "px";
		document.getElementById("header_left_text").style.left = content_padding + header_left_width + "px";
		var header_left_text_height = document.getElementById("header_left_text").clientHeight;
		document.getElementById("header_left_text").style.top = header_top_padding1_height + ((header_left_height - header_left_text_height)/2) + "px";
		document.getElementById("header_right").style.right = content_padding + "px";
		var header_right_height = document.getElementById("header_right").clientHeight;
		document.getElementById("header_right").style.top = (header_left_height - header_right_height)/2 + header_top_padding1_height + "px";
		//POSITION THE ARROW
		document.getElementById("mygarden_arrow").style.display = "initial";
		document.getElementById("mygarden_arrow").style.top = (header_left_height - header_right_height)/2 
			+ header_top_padding1_height + header_right_height + "px";
		var mygarden_arrow_height = document.getElementById("mygarden_arrow").clientHeight;
		header_height = (header_left_height - header_right_height)/2 + header_top_padding1_height + header_right_height 
			+ mygarden_arrow_height + header_top_padding2_height;
		document.getElementById("header_content").style.paddingBottom = mygarden_arrow_height 
			- ((header_top_padding1_height + header_left_height) - ((header_left_height - header_right_height)/2 
			+ header_top_padding1_height + header_right_height)) + "px";
		var header_right_li = document.getElementById("header_right").getElementsByTagName("li");
		var header_right_li_width = 0;
		var header_right_li_widthes = new Array(header_right_li.length);
		for (var i = header_right_li.length - 1; i >= 0; i--) {
			header_right_li_widthes[i] = parseFloat(window.getComputedStyle(header_right_li[i], null).width)
							+ parseFloat(window.getComputedStyle(header_right_li[i], null).paddingLeft)
							+ parseFloat(window.getComputedStyle(header_right_li[i], null).paddingRight)
							+ parseFloat(window.getComputedStyle(header_right_li[i], null).marginLeft)
							+ parseFloat(window.getComputedStyle(header_right_li[i], null).marginRight);
			header_right_li_width = header_right_li_width + header_right_li_widthes[i];
		};
		var mygarden_arrow_width = document.getElementById("mygarden_arrow").clientWidth;
		var mygarden_arrow_padding = content_padding + header_right_li_width
			- header_right_li_widthes[0];
		if (mygarden_arrow_width > header_right_li_widthes[0]) {
			document.getElementById("mygarden_arrow").style.right = mygarden_arrow_padding
				- (mygarden_arrow_width - header_right_li_widthes[0])/2 + "px";
		} else {
			document.getElementById("mygarden_arrow").style.right = mygarden_arrow_padding
				+ (header_right_li_widthes[0] - mygarden_arrow_width)/2 + "px";
		}
	}
	document.getElementById("header").style.height = header_height + "px";
	
	//FOOTER
	document.getElementById("links_bar").style.width = content_width + "px";
	document.getElementById("links").style.width = content_width + "px";
	if (page == "improving.html") {
		document.getElementById("links_arrow").style.visibility = "hidden";
	} else {
		document.getElementById("links_arrow").style.visibility = "visible";
	}
	var links_a = document.getElementById("links").getElementsByTagName("a");
	var links_li = document.getElementById("links").getElementsByTagName("li");
	if (mobile) {
		document.getElementById("links_arrow").style.display = "none";
		document.getElementById("links_bar_padding1").style.paddingBottom = "0px";
		//REDESIGN THE BUTTONS TO MOBILE
		document.getElementById("a_idea").text = "1";
		document.getElementById("a_model").text = "2";
		document.getElementById("a_settingup").text = "3";
		document.getElementById("a_analysing").text = "4";
		document.getElementById("a_improving").text = "5";
		for (var i = links_a.length - 1; i >= 0; i--) {
			links_a[i].style.fontSize = "200%";
			links_a[i].style.fontFamily= "Arial Black";
		};
		for (var i = links_li.length - 1; i >= 0; i--) {
			links_li[i].style.width = parseFloat(window.getComputedStyle(links_li[i], null).height) + "px";
			links_li[i].style.padding = "0px";
			links_li[i].style.marginTop = "10px";
			if (i == links_li.length - 1) {
				links_li[i].style.marginLeft = "5px";
				links_li[i].style.marginRight = "0px";
			} else if (i == 0) {
				links_li[i].style.marginRight = "5px";
				links_li[i].style.marginLeft = "0px";
			} else {
				links_li[i].style.marginLeft = "5px";
				links_li[i].style.marginRight = "5px";
			}
		};
	} else {
		//REDESIGN THE BUTTONS TO DEFAULT
		document.getElementById("a_idea").text = "The Idea";
		document.getElementById("a_model").text = "The Model";
		document.getElementById("a_settingup").text = "How to Set Up";
		document.getElementById("a_analysing").text = "Analysing";
		document.getElementById("a_improving").text = "Improving";
		for (var i = links_a.length - 1; i >= 0; i--) {
			links_a[i].style.fontSize = "125%";
			links_a[i].style.fontFamily= "Georgia";
		};
		var links_li_width = 0;
		var links_li_widthes = new Array(links_li.length);
		for (var i = links_li.length - 1; i >= 0; i--) {
			links_li[i].style.width = "auto";
			links_li[i].style.padding = "10px";
			links_li[i].style.marginTop = "0px";
			links_li[i].style.marginLeft = "5px";
			links_li[i].style.marginRight = "5px";
			links_li_widthes[i] = parseFloat(window.getComputedStyle(links_li[i], null).width)
							+ parseFloat(window.getComputedStyle(links_li[i], null).paddingLeft)
							+ parseFloat(window.getComputedStyle(links_li[i], null).paddingRight)
							+ parseFloat(window.getComputedStyle(links_li[i], null).marginLeft)
							+ parseFloat(window.getComputedStyle(links_li[i], null).marginRight)
							/*+ parseFloat(window.getComputedStyle(links_li[i], null).border)
							+ parseFloat(window.getComputedStyle(links_li[i], null).border)*/
							+ 2; //to fix no border return bug on Mozilla
			links_li_width = links_li_width + links_li_widthes[i];
		};
		//POSITION THE ARROW
		document.getElementById("links_arrow").style.display = "initial";
		var links_arrow_height = document.getElementById("links_arrow").clientHeight;
		var links_bar_padding2_height = document.getElementById("links_bar_padding2").clientHeight;
		var links_height = document.getElementById("links").clientHeight;
		document.getElementById("links_arrow").style.bottom = links_bar_padding2_height + links_height + "px";
		document.getElementById("links_bar_padding1").style.paddingBottom = links_arrow_height + "px";
		var links_arrow_width = document.getElementById("links_arrow").clientWidth;
		var arrow_padding = (body_width - links_li_width)/2;
		var links_li_page;
		if (page == "index.html" || page == "") {
			document.getElementById("links_arrow_h2").innerHTML = "Start here!";
			links_arrow_width = document.getElementById("links_arrow").clientWidth;
			links_li_page = links_li_widthes[0];
			if (links_arrow_width > links_li_page) {
				document.getElementById("links_arrow").style.left = arrow_padding - (links_arrow_width - links_li_page)/2 + "px";
			} else {
				document.getElementById("links_arrow").style.left = arrow_padding + (links_li_page - links_arrow_width)/2 + "px";
			}
		} else if (page == "idea.html") {
			links_li_page = links_li_widthes[1];
			arrow_padding = arrow_padding + links_li_widthes[0];
			if (links_arrow_width > links_li_page) {
				document.getElementById("links_arrow").style.left = arrow_padding - (links_arrow_width - links_li_page)/2 + "px";
			} else {
				document.getElementById("links_arrow").style.left = arrow_padding + (links_li_page - links_arrow_width)/2 + "px";
			}
		} else if (page == "model.html") {
			links_li_page = links_li_widthes[2];
			arrow_padding = arrow_padding + links_li_widthes[0] + links_li_widthes[1];
			if (links_arrow_width > links_li_page) {
				document.getElementById("links_arrow").style.left = arrow_padding - (links_arrow_width - links_li_page)/2 + "px";
			} else {
				document.getElementById("links_arrow").style.left = arrow_padding + (links_li_page - links_arrow_width)/2 + "px";
			}
		} else if (page == "settingup.html") {
			links_li_page = links_li_widthes[3];
			arrow_padding = arrow_padding + links_li_widthes[0] + links_li_widthes[1] + links_li_widthes[2];
			if (links_arrow_width > links_li_page) {
				document.getElementById("links_arrow").style.left = arrow_padding - (links_arrow_width - links_li_page)/2 + "px";
			} else {
				document.getElementById("links_arrow").style.left = arrow_padding + (links_li_page - links_arrow_width)/2 + "px";
			}
		} else if (page == "analysing.html") {
			links_li_page = links_li_widthes[4];
			arrow_padding = arrow_padding + links_li_widthes[0] + links_li_widthes[1] + links_li_widthes[2] + links_li_widthes[3];
			if (links_arrow_width > links_li_page) {
				document.getElementById("links_arrow").style.left = arrow_padding - (links_arrow_width - links_li_page)/2 + "px";
			} else {
				document.getElementById("links_arrow").style.left = arrow_padding + (links_li_page - links_arrow_width)/2 + "px";
			}
		}
	}
	links_bar_height = document.getElementById("links_bar").clientHeight;

	//BODY
	document.getElementById("body_content").style.width = content_width + "px";
	//SET THE DEFAULT VALUES
	var body_content_h1 = document.getElementById("body_content").getElementsByTagName("H1");
	for (var i = body_content_h1.length - 1; i >= 0; i--) {
		body_content_h1[i].style.fontSize = "32px";
	};
	var body_content_h2 = document.getElementById("body_content").getElementsByTagName("H2");
	for (var i = body_content_h2.length - 1; i >= 0; i--) {
		body_content_h2[i].style.fontSize = "24px";
	};
	var body_content_h3 = document.getElementById("body_content").getElementsByTagName("H3");
	for (var i = body_content_h3.length - 1; i >= 0; i--) {
		body_content_h3[i].style.fontSize = "18.72px";
	};
	var body_content_h4 = document.getElementById("body_content").getElementsByTagName("H4");
	for (var i = body_content_h4.length - 1; i >= 0; i--) {
		body_content_h4[i].style.fontSize = "16px";
	};
	var body_content_img = document.getElementById("body_content").getElementsByTagName("IMG");
	for (var i = body_content_img.length - 1; i >= 0; i--) {
		body_content_img[i].style.height = body_content_img[i].style.maxHeight;
	};
	try {
		//reduce the width of the img's that are bigger than the body_content div
		var body_content_img_need_resize_width = true;
		for (var i = body_content_img.length - 1; i >= 0; i--) {
			while ((parseFloat(window.getComputedStyle(body_content_img[i], null).width) > content_width)
				&& body_content_img_need_resize_width) {
				if ((0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).width) < 5)
					|| (0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).height) < 5)) {
					body_content_img_need_resize_width = false;
				} else {
					body_content_img[i].style.height = 0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).height) + "px";
				}
			}
		};
		var body_content_h1_need_resize = false;
		var body_content_h2_need_resize = false;
		var body_content_h3_need_resize = false;
		var body_content_h4_need_resize = false;
		var body_content_img_need_resize = false;
		while(document.getElementById("body_content").clientHeight > body_height - (header_height + links_bar_height)) {
			//reduce the size of the h1's in the body_content div
			for (var i = body_content_h1.length - 1; i >= 0; i--) {
				if (0.95*parseFloat(window.getComputedStyle(body_content_h1[i], null).fontSize) < 5) {
					body_content_h1_need_resize = false;
				} else {
					body_content_h1_need_resize = true;
					body_content_h1[i].style.fontSize = 0.95*parseFloat(window.getComputedStyle(body_content_h1[i], null).fontSize) + "px";
				}
			};
			//reduce the size of the h2's in the body_content div
			for (var i = body_content_h2.length - 1; i >= 0; i--) {
				if (0.95*parseFloat(window.getComputedStyle(body_content_h2[i], null).fontSize) < 5) {
					body_content_h2_need_resize = false;
				} else {
					body_content_h2_need_resize = true;
					body_content_h2[i].style.fontSize = 0.95*parseFloat(window.getComputedStyle(body_content_h2[i], null).fontSize) + "px";
				}
			};
			//reduce the size of the h3's in the body_content div
			for (var i = body_content_h3.length - 1; i >= 0; i--) {
				if (0.95*parseFloat(window.getComputedStyle(body_content_h3[i], null).fontSize) < 5) {
					body_content_h3_need_resize = false;
				} else {
					body_content_h3_need_resize = true;
					body_content_h3[i].style.fontSize = 0.95*parseFloat(window.getComputedStyle(body_content_h3[i], null).fontSize) + "px";
				}
			};
			//reduce the size of the h4's in the body_content div
			for (var i = body_content_h4.length - 1; i >= 0; i--) {
				if (0.95*parseFloat(window.getComputedStyle(body_content_h4[i], null).fontSize) < 5) {
					body_content_h4_need_resize = false;
				} else {
					body_content_h4_need_resize = true;
					body_content_h4[i].style.fontSize = 0.95*parseFloat(window.getComputedStyle(body_content_h4[i], null).fontSize) + "px";
				}
			};
			//recude the size of the img's in the body_content div
			for (var i = body_content_img.length - 1; i >= 0; i--) {
				if ((0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).width) < 5)
					|| (0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).height) < 5)) {
					body_content_img_need_resize = false;
				} else {
					body_content_img_need_resize = true;
					body_content_img[i].style.height = 0.95*parseFloat(window.getComputedStyle(body_content_img[i], null).height) + "px";
				}
			};
			if (!body_content_h1_need_resize && !body_content_h2_need_resize && !body_content_h3_need_resize
				&& !body_content_h4_need_resize && !body_content_img_need_resize) {
				break;
			}
		}
	} catch(err) {}
	var body_content_height = document.getElementById("body_content").clientHeight;
	document.getElementById("body_content").style.top = (body_height - (header_height + links_bar_height + body_content_height))/2 + header_height + "px";				

	//SHOW ESPECIAL ARROW FOR HOME PAGE MOBILE
	if ((mobile) && (page == "index.html" || page == "")) {
		document.getElementById("links_arrow").style.left = "0px";
		document.getElementById("links_arrow").style.display = "initial";
		document.getElementById("links_arrow_h2").innerHTML = "See how in five steps!";
		var links_arrow_height2 = document.getElementById("links_arrow").clientHeight;
		var links_arrow_width2 = document.getElementById("links_arrow").clientWidth;
		document.getElementById("links_arrow").style.bottom = ((((content_height - (header_height + links_bar_height 
			+ body_content_height))/4) - links_arrow_height2)/2) + links_bar_height + "px";
		document.getElementById("links_arrow").style.left = (body_width - links_arrow_width2)/2 + "px";
	}

	//HIDE THE LOADING AND SHOW THE BODY
	document.getElementById("loading").style.visibility = "hidden";
	document.getElementById("loading").style.display = "none";
	document.body.style.visibility = "visible";
}

window.addEventListener("load", size);
window.addEventListener("resize", size);
