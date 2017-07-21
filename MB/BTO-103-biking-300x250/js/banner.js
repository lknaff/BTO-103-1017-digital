(function(window)
{
	//Banner.inheritsFrom( window.Banner_Base );

	function Banner()
	{
		this.init();
	};

	Banner.prototype.init = function()
	{
		this.__allowHoverEffect = false;
		this.__loopCount = 0;
		this.__width = 300;
		this.__height = 250;
		this.start();
	};

	Banner.prototype.render = function()
	{
		this.defineElements();
		this.positionElements();
		this.defineInteraction();
		this.run();
	};

	Banner.prototype.defineElements = function()
	{
		this.__container = $("#container");
		this.__border = $("#border");
		this.__cta = $("#cta");
		this.__hover = $("#hover");
		this.__banner = $("#banner");
		this.__content = $("#content");

		this.__heroWrapper = $("#hero-wrapper");
		this.__bgExit = $("#bg-exit");
	};

	Banner.prototype.positionElements = function()
	{
		var w = this.__width
		var h = this.__height;
		var stroke = 1;

		this.__container.css({width:w, height:h, opacity:1});
		this.__banner.css({top:stroke, left:stroke, width:w-stroke*2, height:h-stroke*2});
		this.__border.css({top:0, left:0, width:w-stroke*2, height:h-stroke*2, opacity:1});
		this.__content.css({top:-stroke, left:-stroke, width:w, height:h});
		this.__bgExit.css({top:0, left:0, width:w, height:h, opacity:0});
	};

	//-------------------------------------------------------------------------

	Banner.prototype.run = function()
	{
		var banner = this;
		setTimeout(function(){banner.showScene();}, 100);
	};

	//-------------------------------------------------------------------------

	Banner.prototype.showScene = function()
	{
    let scene1     = anime.timeline();
		let copyScene  = anime.timeline();
		let finalScene = anime.timeline();

    scene1
      .add({
        targets: '#bg',
        opacity: 1,
				offset: 0
      })
      .add({
        targets: '#bg2',
        opacity: 1,
				offset: 0
      })
			.add({
				targets: '#bg',
				translateX: {
          value: -15,
          duration: 3500,
          easing: 'linear',
        },
				offset: 0
			});

			copyScene
			.add({
				targets: '#copybg',
				translateX: 279,
				opacity: 1,
				elasticity: 100,
				offset: 400
			})
			.add({
				targets: '#copy',
				translateX: 300,
				elasticity: 100,
				opacity: 1,
				offset: 500
			});

		finalScene
			.add({
				targets: '#cta',
				translateY: -12,
				elasticity: 100,
				opacity: 1,
				offset: 2000
			});

		var banner = this;
		setTimeout(function(){banner.end();}, 2100);

	};

	//-------------------------------------------------------------------------

	Banner.prototype.start = function()
	{
		this.__start = new Date();
	};

	Banner.prototype.end = function()
	{
		this.__loopCount++;
		this.__allowHoverEffect = true;
		var now = new Date();
		var time = now.getTime() - this.__start.getTime();
		trace("total run time = " + time/1000 + " seconds");
	};

	//-------------------------------------------------------------------------

	Banner.prototype.defineInteraction = function()
	{
		var banner = this;
		var offset = 4;
		this.__bgExit.click(function()
		{
			banner.clickThrough();
		});
		this.__bgExit.mouseover(function()
		{
			if(banner.__allowHoverEffect == false)
			{
				return;
			}
			banner.onMouseOver();
		});
}

	Banner.prototype.onMouseOver = function()
	{
		anime({
			targets: '#cta',
			scale: 1.1,
			translateY: 0,
			direction: 'alternate',
			easing: 'easeOutQuart',
			elasticity: 700,
			duration: 125,
			loop: 1
		});
	};

	Banner.prototype.clickThrough = function()
	{
		trace("click through: " + window.clickTag);
		window.open(window.clickTag)

		//var ID = "Background Exit";
		//trace("exit with ID: '" + ID + "'");
		//Enabler.exit(ID);
	};

	window.Banner = Banner;

}(window));

// Global functions
//-------------------------------------------------------------------------

function trace(s)
{
	console.log(s);
}

function animate(_delay, _$o, _attr, _speed, _easing)
{
	_easing = _easing || 'easeInOutCubic';
	var to = setTimeout(function(){
		 _$o.transition(_attr, _speed, _easing);
		//_$o.transition(_attr, {duration: _speed, easing: _easing, queue: false}, null);
	}, _delay);
	return to;
};

function timeout( _delay, _func )
{
	var to = setTimeout(function(){_func();}, _delay);
	return to;
};

Function.prototype.inheritsFrom = function( superClass )
{
	this.prototype = new superClass;
	this.prototype.constructor = this;
	this.prototype.sooper = superClass.prototype;
	return this;
};
