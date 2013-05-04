#!/bin/bash
perl -pi -e 's/tppabs="[^"]*"//g' $1
perl -pi -e 's/href="javascript[^"]*"/href=""/g' $1
perl -pi -e 's/img src="([^"]*)"/img src=\/static\/pin\/$1/g' $1


