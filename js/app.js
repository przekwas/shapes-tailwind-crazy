// seed the inputs for testing
seedInputs();

// event click & tap for iOS glitch
$('#seed-btn').on('click tap', () => seedInputs());
$('#rectangle-btn').on('click tap', () => Shape.make('rectangle'));
$('#square-btn').on('click tap', () => Shape.make('square'));
$('#circle-btn').on('click tap', () => Shape.make('circle'));
$('#triangle-btn').on('click tap', () => Shape.make('triangle'));

class Shape {
	static CANVAS_SIZE = 600;

	static genRandomPosition(offset) {
		return `${Math.floor(Math.random() * (Shape.CANVAS_SIZE - offset))}px`;
	}

	static clearInput(type) {
		$(`input[name=${type}-input]`).val('');
	}

	static grabAndSanitize(type) {
		const data = [];
		$(`input[name=${type}-input]`).each(function () {
			const val = Number($(this).val());
			if (val >= 600 || val <= 0) {
				throw new Error('do better numbers, you dumb idiot');
			}

			data.push(val);
		});
		return data;
	}

	static make(type) {
		try {
			const data = Shape.grabAndSanitize(type);

			switch (type) {
				case 'rectangle':
					new Rectangle(...data);
					break;
				case 'square':
					new Square(...data);
					break;
				case 'circle':
					new Circle(...data);
					break;
				case 'triangle':
					new Triangle(...data);
					break;
			}

			Shape.clearInput(type);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Fuck You.',
				text: error.message
			});
		}
	}

	constructor(height, width) {
		this.height = height;
		this.width = width;
		this.div = $('<div class="absolute cursor-pointer"></div>');
		this.render();
	}

	addEvents() {
		this.div.on('click', () => this.describe());
		this.div.on('dblclick', () => this.destroy());
	}

	render() {
		const top = Shape.genRandomPosition(this.height);
		const left = Shape.genRandomPosition(this.width);
		this.div.css({
			top,
			left,
			height: `${this.height}px`,
			width: `${this.width}px`
		});
		this.addEvents();
		$('.canvas').append(this.div);
	}

	area() {
		return this.height * this.width;
	}

	perimeter() {
		return 2 * this.height + 2 * this.width;
	}

	describe() {
		$('#panel-name').text(this.name);
		$('#panel-height').text(this.height + ' px');
		$('#panel-width').text(this.width + ' px');
		$('#panel-radius').text(this.radius ? this.radius + ' px' : 'n/a');
		$('#panel-area').text(this.area() + ' px');
		$('#panel-perimeter').text(this.name !== 'circle' ? this.perimeter() + ' px' : 'n/a');
		$('#panel-circumference').text(
			this.name === 'circle' ? this.circumference() + ' px' : 'n/a'
		);
	}

	destroy() {
		this.div.remove();
		$('.panel-text').html('&nbsp;');
	}
}

class Rectangle extends Shape {
	constructor(height, width) {
		super(height, width);
		this.name = 'rectangle';
		this.div.addClass(this.name);
	}
}

class Square extends Shape {
	constructor(side) {
		super(side, side);
		this.name = 'square';
		this.div.addClass(this.name);
	}
}

class Circle extends Shape {
	constructor(radius) {
		super(radius, radius);
		this.radius = radius;
		this.name = 'circle';
		this.div.addClass(this.name);
	}

	circumference() {
		return (2 * Math.PI * this.radius).toFixed(2);
	}

	area() {
		return (Math.PI * Math.pow(this.radius, 2)).toFixed(2);
	}
}

class Triangle extends Shape {
	constructor(radius) {
		super(radius, radius);
		this.name = 'trigangle';
		this.div.addClass(this.name);
	}

	render() {
		super.render();
		this.div.css({
			height: '0px',
			width: '0px',
			borderLeft: `${this.height}px solid rgba(16, 185, 129, 0.75)`,
			borderTop: `${this.height}px solid transparent`
		});
	}
}

function seedInputs() {
	['rectangle', 'square', 'circle', 'triangle'].forEach(name => {
		if (name === 'rectangle') {
			$(`input[name=${name}-input]:nth-of-type(1)`).val(100);
			$(`input[name=${name}-input]:nth-of-type(2)`).val(200);
			return;
		}
		$(`input[name=${name}-input]`).val(100);
	});
}

/*
	// weird regex solution for getting a class name
	const type = classObj
			.toString()
			.toLowerCase()
			.match(/ (\w+)/)[1];
*/
