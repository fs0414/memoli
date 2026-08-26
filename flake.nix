{
  description = "memoli - CLI markdown memo manager";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-darwin-x86.url = "github:NixOS/nixpkgs/nixpkgs-26.05-darwin";
    shared.url = "github:sorafujitani/shared-flake-nix";
    shared.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs =
    {
      self,
      nixpkgs,
      nixpkgs-darwin-x86,
      shared,
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs =
            if system == "x86_64-darwin" then
              nixpkgs-darwin-x86.legacyPackages.${system}
            else
              nixpkgs.legacyPackages.${system};
          bunTarget = {
            aarch64-darwin = "darwin-aarch64";
            x86_64-darwin = "darwin-x64";
            aarch64-linux = "linux-aarch64";
            x86_64-linux = "linux-x64";
          }.${system};
          bunHash = {
            aarch64-darwin = "sha256-xmnpf2Fk4cluBwF0jbmN+ndJKQjL2DlMdVcTSnNd44E=";
            x86_64-darwin = "sha256-HQIRuPHcmRGCNEaHrRXnLuhvFUhFpff6R3mUzTQd2bA=";
            aarch64-linux = "sha256-SxozLuhhmD65O8/m93D/+U4+MbLDiL2uo8jtNeWO7Q4=";
            x86_64-linux = "sha256-LQP7X7g6yLVnrKCigbLOGhoZ1Ij1bClo2Iw/Jekv5FI=";
          }.${system};
          bunLatest = pkgs.runCommand "bun-1.4.0" { nativeBuildInputs = [ pkgs.unzip ]; } ''
            mkdir -p $out/bin
            unzip -q ${pkgs.fetchurl {
              url = "https://github.com/oven-sh/bun/releases/download/bun-v1.4.0/bun-${bunTarget}.zip";
              hash = bunHash;
            }}
            install -m755 bun-${bunTarget}/bun $out/bin/bun
            ln -s bun $out/bin/bunx
          '';
        in
        {
          default = shared.lib.mkDevShell {
            inherit pkgs;
            name = "memoli";
            buildInputs = [
              bunLatest
            ];
          };
        }
      );
    };
}
