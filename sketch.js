const radio = 100;
let x1 = 100;
let y1 = 150;
let x2 = 0;
let y2 = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
    for (let i = 0; i <= 2; i++) {
        x1+= radio * 2 + 100;
        circle(x1, y1, radio * 2);
        for (let a = 0; a <= 360; a += 45) {
            let r = radians(a);
            x2 = Math.floor(x1 + (radio * cos(r)));
            y2 = Math.floor(y1 + (radio * sin(r)));
            switch(i){
                case 0:
                    ecuPp(x1, y1, x2, y2);
                    text("Punto pendiente", x1 - 50, y1 + 120);
                break;
                case 1:
                    ecuDda(x1, y1, x2, y2);
                     text("DDA", x1 - 50, y1 + 120);
                break;
                case 2: 
                    ecuBresenham(x1, y1, x2, y2);
                    text("Bresenham", x1 - 50, y1 + 120);
                break;
            }

          }
    }
    noLoop();
}


function ecuPp(x1, y1, x2, y2) {
	let x = x1;
	let y = y1;
	let stepX = 1;
	let stepY = 1;
	const dx = x2 - x1;
	const dy = y2 - y1;
	if (dx == 0) {
		if (dy < 0) stepY = -1;
		while(y != y2){
			point(x, y);
			y += stepY;
		}
	}else{
		const m = dy / dx;
		const b = y1 - m * x1;

		if (dx < 0) stepX = -1;
		while (x != x2){
			point(x, y);
			x+= stepX;
			y = m * x + b;
		}
	}
}

function ecuDda(x1, y1, x2, y2) {
	let x = x1;
	let y = y1;
	const dx = x2 - x1;
	const dy = y2 - y1;
	const m = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
	const contX = dx / m;
	const contY = dy / m;

	for (let i = 0; i < m; i++) {
		x += contX;
		y += contY;
		point(x, y);
	}
}

function ecuBresenham(x1, y1, x2, y2) {
	let x = x1;
	let y = y1;
	let stepX = 1;
	let stepY = 1;
	let dx = x2 - x1;
	let dy = y2 - y1;
	let p = 0;

	if (dy < 0) {
	    dy = -dy;
	    stepY = -1;
  	}

    if (dx < 0) {
	    dx = -dx;
	    stepX = -1;
    }

    if (dx > dy) {
	    p = 2 * dy - dx;
	    while (x != x2) {
	      point(x, y);
	      x += stepX;
	      if (p < 0) {
	        p += 2 * dy;
	      } else {
	        y += stepY;
	        p += 2 * (dy - dx);
	      }
	    }
    } else {
	    p = 2 * dx - dy;
	    while (y != y2) {
	      point(x, y);
	      y += stepY;
	      if (p < 0) {
	        p += 2 * dx;
	      } else {
	        x += stepX;
	        p += 2 * (dx - dy);
	    }
    }
  }

}