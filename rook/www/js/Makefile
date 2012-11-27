JS = v2_cntrl.js \
     v2_menu.js \
     labeling.js \
     v2_chart.js

all: smp.js

smp.js: $(JS)
	rm -f $@
	cat $(JS) > $@

clean: 
	rm -f smp.js