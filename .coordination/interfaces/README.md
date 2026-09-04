# Shared Interface Registry

This directory is integrator-owned. It records stable contracts that more than one lane depends on, such as component props, data shapes, navigation entries, asset conventions, and generated-document interfaces.

Feature agents do not edit this directory. Submit an `INTERFACE_CHANGE` or `SHARED_FILE_REQUEST` message in control-room issue #6 with:

- existing contract;
- proposed behavior;
- affected lanes and paths;
- backward-compatibility impact;
- blocking status;
- associated issue and pull request.

The integrator adds or changes an interface record only after resolving cross-lane effects.
