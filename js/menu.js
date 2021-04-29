$('#menu-open').on('click', () => {
	$('#menu-div').animate(
		{ left: '0px' },
		{
			duration: 250,
			easing: 'linear'
		}
	);
});

$('#menu-close').on('click', () => {
	$('#menu-div').animate(
		{ left: '-417px' },
		{
			duration: 250,
			easing: 'linear'
		}
	);
});