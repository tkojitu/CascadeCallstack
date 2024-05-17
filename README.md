# cascadecallstack README

## Features

Cascade callstack text from Visual Studio.

## Usage

Copy & paste callstack text from Visual Studio. Select it. Type "Cascade Callstack" 

before:

    c()
    b()
    a()

after:

    a
    |- b
    |- |- c
