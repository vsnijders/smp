JS = cntrl.js \
     menu.js \
     labeling.js \
     axis.js \
     chart.js \
     linechart.js \
     scatterchart.js \
     mosaicchart.js \
     barchart.js

all: ../smp.js

../smp.js: $(JS)
	rm -f $@
	cat $(JS) > $@

clean: 
	rm -f ../smp.js